import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  TextField,
  IconButton,
  Tooltip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Snackbar,
  Alert,
  TablePagination,
  Typography,
  Grid
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import DownloadIcon from '@mui/icons-material/Download';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const ApplicantsTab = () => {
  const [applicants, setApplicants] = useState([]);
  const [search, setSearch] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewIndex, setPreviewIndex] = useState(null);
  const [showFront, setShowFront] = useState(true);
  const [editData, setEditData] = useState({});
  const [editOpen, setEditOpen] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });
  const [sortByNameAsc, setSortByNameAsc] = useState(true);
  const [sortByDateAsc, setSortByDateAsc] = useState(true);
  const [selectedDate, setSelectedDate] = useState(null);
  const [recentlyEditedId, setRecentlyEditedId] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, id: null });

  const adminName = localStorage.getItem('adminName');

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/applicants');
      const data = await res.json();
      setApplicants(data);
    } catch (err) {
      console.error('Error loading applicants:', err);
    }
  };

  const handleSearch = (e) => setSearch(e.target.value);
  const handleImageClick = (index) => {
    setPreviewIndex(index);
    setShowFront(true);
    setPreviewOpen(true);
  };

const handleNext = () => {
  setShowFront((prev) => !prev);
};


  const handleDownload = () => {
    const image = getPreviewImage();
    const link = document.createElement('a');
    link.href = image;
    link.download = image.split('/').pop();
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleEdit = (applicant) => {
    setEditData(applicant);
    setEditOpen(true);
  };

  const handleDelete = (id) => {
    setDeleteConfirm({ open: true, id });
  };

  const confirmDelete = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/applicants/${deleteConfirm.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchApplicants();
        setSnack({ open: true, message: 'Applicant deleted', severity: 'success' });
        setDeleteConfirm({ open: false, id: null });
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const handleUpdate = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/applicants/${editData._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editData, lastEditedBy: adminName }),
      });
      if (res.ok) {
        setRecentlyEditedId(editData._id);
        fetchApplicants();
        setEditOpen(false);
        setSnack({ open: true, message: 'Applicant updated by ' + adminName, severity: 'success' });
      }
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const clearDateFilter = () => setSelectedDate(null);

  const filtered = applicants
    .filter((app) => {
      const combined = `${app.name} ${app.address} ${app.phone} ${app.dateSubmitted}`.toLowerCase();
      return combined.includes(search.toLowerCase());
    })
    .filter((app) => {
      if (!selectedDate) return true;
      const appDate = dayjs(app.dateSubmitted);
      return appDate.isSame(selectedDate, 'day');
    });

  const sorted = [...filtered].sort((a, b) => {
    if (sortByNameAsc) return a.name.localeCompare(b.name);
    if (!sortByNameAsc) return b.name.localeCompare(a.name);
    return 0;
  });

  const paginated = sorted.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  const getPreviewImage = () => {
    if (previewIndex === null || !filtered[previewIndex]) return '';
    const app = filtered[previewIndex];
    const photo = showFront ? app.idImagePath : app.idImagePath2;
    return `http://localhost:5000/${photo}`;
  };

  const exportCSV = () => {
    const headers = ['Name', 'Address', 'Phone', 'Date Submitted', 'Last Edited By'];
    const rows = filtered.map(app => [
      app.name,
      app.address,
      app.phone,
      new Date(app.dateSubmitted).toLocaleDateString(),
      app.lastEditedBy || ''
    ]);
    const csvContent = [headers, ...rows].map(e => e.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'applicants.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h6" gutterBottom>Applicants</Typography>

        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Search"
              value={search}
              onChange={handleSearch}
              fullWidth
              size="small"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <DatePicker
              label="Filter Date"
              value={selectedDate}
              onChange={setSelectedDate}
              slotProps={{ textField: { fullWidth: true, size: 'small' } }}
            />
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <Button onClick={clearDateFilter} fullWidth size="small">Clear</Button>
          </Grid>
          <Grid item xs={6} sm={3} md={1.5}>
            <Button variant="contained" onClick={exportCSV} startIcon={<FileDownloadIcon />} fullWidth size="small">
              Export
            </Button>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 2 }} />

        <TableContainer component={Paper} sx={{ borderRadius: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f3f4f6' }}>
                <TableCell><strong>Photo</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Address</strong></TableCell>
                <TableCell><strong>Phone</strong></TableCell>
                <TableCell><strong>Date</strong></TableCell>
                <TableCell><strong>Last Edited By</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginated.map((app, index) => (
                <TableRow
                  key={app._id || index}
                  hover
                  sx={app._id === recentlyEditedId ? { backgroundColor: '#e3f2fd' } : {}}
                >
                  <TableCell>
                    <Avatar
                      src={`http://localhost:5000/${app.idImagePath}`}
                      variant="rounded"
                      sx={{ width: 48, height: 48, cursor: 'pointer' }}
                      onClick={() => handleImageClick(index)}
                    />
                  </TableCell>
                  <TableCell>{app.name}</TableCell>
                  <TableCell>{app.address || 'N/A'}</TableCell>
                  <TableCell>{app.phone || 'N/A'}</TableCell>
                  <TableCell>{new Date(app.dateSubmitted).toLocaleDateString()}</TableCell>
                  <TableCell>{app.lastEditedBy || '—'}</TableCell>
                  <TableCell>
                    <Tooltip title="Edit">
                      <IconButton onClick={() => handleEdit(app)} color="primary" size="small">
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton onClick={() => handleDelete(app._id)} color="error" size="small">
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <TablePagination
          component="div"
          count={filtered.length}
          page={page}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />

        {/* Image Preview Dialog */}
        <Dialog open={previewOpen} onClose={() => setPreviewOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>ID Preview ({showFront ? 'Front' : 'Back'})</DialogTitle>
          <DialogContent dividers>
            <Box display="flex" justifyContent="center" alignItems="center" py={2}>
              <img
                src={getPreviewImage()}
                alt="ID Preview"
                style={{ maxWidth: '100%', maxHeight: 400, borderRadius: 8 }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ justifyContent: 'space-between', px: 3, pb: 2 }}>
            <Button onClick={handleDownload} startIcon={<DownloadIcon />} variant="outlined">
              Download
            </Button>
            <Box>
              <Button onClick={handleNext} endIcon={<SwapHorizIcon />} sx={{ mr: 1 }}>
                {showFront ? 'View Back' : 'View Front'}
              </Button>
              <Button onClick={() => setPreviewOpen(false)}>Close</Button>
            </Box>
          </DialogActions>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
          <DialogTitle sx={{ fontWeight: 600 }}>Edit Applicant</DialogTitle>
          <DialogContent dividers>
            <Box display="flex" flexDirection="column" gap={2} mt={1}>
              <TextField
                fullWidth
                label="Full Name"
                value={editData.name || ''}
                onChange={(e) => setEditData({ ...editData, name: e.target.value })}
              />
              <TextField
                fullWidth
                label="Address"
                value={editData.address || ''}
                onChange={(e) => setEditData({ ...editData, address: e.target.value })}
              />
              <TextField
                fullWidth
                label="Contact Number"
                value={editData.phone || ''}
                onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setEditOpen(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleUpdate}>
              Save Changes
            </Button>
          </DialogActions>
        </Dialog>

        {/* Delete Confirmation Dialog */}
        <Dialog open={deleteConfirm.open} onClose={() => setDeleteConfirm({ open: false, id: null })}>
          <DialogTitle sx={{ fontWeight: 600 }}>Confirm Deletion</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">
              Are you sure you want to delete this applicant? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button onClick={() => setDeleteConfirm({ open: false, id: null })}>Cancel</Button>
            <Button color="error" variant="contained" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for Notifications */}
        <Snackbar
          open={snack.open}
          autoHideDuration={4000}
          onClose={() => setSnack({ ...snack, open: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert
            severity={snack.severity}
            variant="filled"
            onClose={() => setSnack({ ...snack, open: false })}
            sx={{ width: '100%' }}
          >
            {snack.message}
          </Alert>
        </Snackbar>

      </Paper>
    </LocalizationProvider>
  );
};

export default ApplicantsTab;
