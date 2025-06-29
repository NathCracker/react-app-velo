import React, { useState, useEffect } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
  IconButton,
  Snackbar,
  Alert,
  TableSortLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TeamTab = () => {
  const [teams, setTeams] = useState([]);
  const [open, setOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [teamData, setTeamData] = useState({
    name: '',
    members: ['', ''],
    plateNumber: '',
  });
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/teams');
      const data = await res.json();
      setTeams(data);
    } catch (err) {
      console.error('Failed to fetch teams:', err);
    }
  };

  const handleChange = (field, value) => {
    setTeamData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index, value) => {
    const updated = [...teamData.members];
    updated[index] = value;
    setTeamData((prev) => ({ ...prev, members: updated }));
  };

  const handleAddMember = () => {
    if (teamData.members.length < 3) {
      setTeamData((prev) => ({ ...prev, members: [...prev.members, ''] }));
    }
  };

  const handleRemoveMember = (index) => {
    if (teamData.members.length > 2) {
      const updated = [...teamData.members];
      updated.splice(index, 1);
      setTeamData((prev) => ({ ...prev, members: updated }));
    }
  };

  const handleSubmit = async () => {
    const url = editId
      ? `http://localhost:5000/api/teams/${editId}`
      : 'http://localhost:5000/api/teams';
    const method = editId ? 'PUT' : 'POST';
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(teamData),
      });
      const result = await res.json();
      if (res.ok) {
        setSnack({ open: true, message: editId ? 'Team updated!' : 'Team added!', severity: 'success' });
        fetchTeams();
        setOpen(false);
        setTeamData({ name: '', members: ['', ''], plateNumber: '' });
        setEditId(null);
      } else {
        setSnack({ open: true, message: result.error || 'Operation failed', severity: 'error' });
      }
    } catch (err) {
      console.error('Submit failed:', err);
      setSnack({ open: true, message: 'Server error', severity: 'error' });
    }
  };

  const handleEdit = (team) => {
    setTeamData({
      name: team.name,
      members: team.members,
      plateNumber: team.plateNumber,
    });
    setEditId(team._id);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this team?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/teams/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setSnack({ open: true, message: 'Team deleted', severity: 'success' });
        fetchTeams();
      } else {
        setSnack({ open: true, message: 'Delete failed', severity: 'error' });
      }
    } catch (err) {
      console.error('Delete error:', err);
      setSnack({ open: true, message: 'Server error deleting team', severity: 'error' });
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const sortedTeams = [...teams].sort((a, b) => {
    const dir = sortConfig.direction === 'asc' ? 1 : -1;
    return a[sortConfig.key].localeCompare(b[sortConfig.key]) * dir;
  });

  return (
    <Paper sx={{ p: 4, borderRadius: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight={600}>
          Teams ({teams.length})
        </Typography>
        <Button variant="contained" size="medium" onClick={() => { setOpen(true); setEditId(null); }}>
          Add Team
        </Button>
      </Box>

      <TableContainer>
        <Table size="small">
          <TableHead sx={{ backgroundColor: '#f3f4f6' }}>
            <TableRow>
              {['name', 'members', 'plateNumber', 'createdAt'].map((key) => (
                <TableCell key={key} sx={{ fontWeight: 600 }}>
                  <TableSortLabel
                    active={sortConfig.key === key}
                    direction={sortConfig.key === key ? sortConfig.direction : 'asc'}
                    onClick={() => handleSort(key)}
                  >
                    {{
                      name: 'Team Name',
                      members: 'Members',
                      plateNumber: 'Plate Number',
                      createdAt: 'Date Created',
                    }[key]}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedTeams.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5}>No teams found.</TableCell>
              </TableRow>
            ) : (
              sortedTeams.map((team) => (
                <TableRow key={team._id} hover>
                  <TableCell>{team.name}</TableCell>
                  <TableCell>{Array.isArray(team.members) ? team.members.join(', ') : '—'}</TableCell>
                  <TableCell>{team.plateNumber}</TableCell>
                  <TableCell>{new Date(team.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleEdit(team)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(team._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>{editId ? 'Edit Team' : 'Add Team'}</DialogTitle>
        <DialogContent sx={{ mt: 1 }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Team Name"
              value={teamData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              fullWidth
            />
            {teamData.members.map((member, idx) => (
              <Box key={idx} sx={{ display: 'flex', gap: 1 }}>
                <TextField
                  label={`Member ${idx + 1}`}
                  value={member}
                  onChange={(e) => handleMemberChange(idx, e.target.value)}
                  fullWidth
                />
                {teamData.members.length > 2 && (
                  <Button onClick={() => handleRemoveMember(idx)} color="error">
                    Remove
                  </Button>
                )}
              </Box>
            ))}
            {teamData.members.length < 3 && (
              <Button onClick={handleAddMember} variant="outlined">
                Add Member
              </Button>
            )}
            <TextField
              label="Plate Number"
              value={teamData.plateNumber}
              onChange={(e) => handleChange('plateNumber', e.target.value)}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained">
            {editId ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snack.severity} variant="filled" onClose={() => setSnack({ ...snack, open: false })}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default TeamTab;
