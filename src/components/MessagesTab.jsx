import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  Avatar,
  CircularProgress,
  Stack,
  TextField,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const MessagesTab = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState('');

  const fetchMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      const data = await res.json();
      setMessages(data);

      const uniqueClients = [...new Set(
        data
          .map((msg) => msg.senderId)
          .filter((id) => id && id !== 'admin')
      )];
      setClients(uniqueClients);
      if (!selectedClient && uniqueClients.length > 0) {
        setSelectedClient(uniqueClients[0]);
      }
    } catch (error) {
      console.error('❌ Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.on('newMessage', (msg) => {
      setMessages((prev) => [...prev, msg]);

      // Add new client if not in list
      if (msg.sender !== 'admin' && msg.senderId && !clients.includes(msg.senderId)) {
        setClients((prev) => [...prev, msg.senderId]);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [clients, selectedClient]);

  const handleSend = () => {
    if (!input.trim() || !selectedClient) return;

    const newMessage = {
      text: input.trim(),
      sender: 'admin',
      senderId: 'admin',
      recipientId: selectedClient,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', newMessage);
    setInput('');
  };

  const filteredMessages = messages.filter(
    (msg) =>
      msg.senderId === selectedClient ||
      msg.recipientId === selectedClient
  );

  return (
    <Box>
      <Typography variant="h5" fontWeight={600} mb={2}>
        Applicant Messages
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Select Client</InputLabel>
        <Select
          value={selectedClient}
          label="Select Client"
          onChange={(e) => setSelectedClient(e.target.value)}
        >
          {clients.map((clientId) => (
            <MenuItem key={clientId} value={clientId}>
              {clientId}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress color="error" />
        </Box>
      ) : filteredMessages.length === 0 ? (
        <Typography>No messages found for this client.</Typography>
      ) : (
        <Stack spacing={2} mb={3}>
          {filteredMessages.map((msg) => (
            <Paper
              key={msg._id || msg.timestamp}
              elevation={2}
              sx={{
                p: 2,
                borderRadius: 2,
                backgroundColor:
                  msg.sender === 'admin' ? '#fff' : '#fef4f4',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar
                  src={
                    msg.sender === 'admin'
                      ? '/admin-avatar.png'
                      : '/user-avatar.png'
                  }
                  sx={{ width: 36, height: 36, mr: 2 }}
                />
                <Box>
                  <Typography fontWeight={500}>
                    {msg.sender === 'admin' ? 'Admin' : msg.senderId}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {new Date(msg.timestamp).toLocaleString()}
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body1">{msg.text}</Typography>
            </Paper>
          ))}
        </Stack>
      )}

      <Paper
        elevation={3}
        sx={{
          p: 2,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <TextField
          fullWidth
          placeholder="Type a reply..."
          variant="outlined"
          size="small"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <IconButton onClick={handleSend} color="error" sx={{ ml: 1 }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default MessagesTab;
