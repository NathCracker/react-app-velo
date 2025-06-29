import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Avatar,
  Typography,
  TextField,
  IconButton,
  Paper,
  Tooltip,
  Slide,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { styled, keyframes } from '@mui/system';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const adminAvatar = '/admin-avatar.png';
const userAvatar = '/user-avatar.png';

const typingAnimation = keyframes`
  0% { opacity: 0.2 }
  20% { opacity: 1 }
  100% { opacity: 0.2 }
`;

const TypingIndicator = styled('div')({
  display: 'flex',
  alignItems: 'center',
  marginTop: 4,
  marginBottom: 4,
  span: {
    height: 8,
    width: 8,
    margin: '0 3px',
    borderRadius: '50%',
    backgroundColor: '#D32F2F',
    animation: `${typingAnimation} 1.5s infinite`,
  },
  'span:nth-of-type(2)': { animationDelay: '0.2s' },
  'span:nth-of-type(3)': { animationDelay: '0.4s' },
});

const MessageContainer = styled(Box)({
  display: 'flex',
  marginBottom: '1rem',
});

const MessageBubble = styled(Paper)(({ isUser }) => ({
  padding: '0.75rem 1rem',
  borderRadius: 12,
  backgroundColor: isUser ? '#f4f4f4' : '#fdecea',
  color: '#000',
  maxWidth: '70%',
  wordBreak: 'break-word',
}));

const ChatWidget = () => {
  const [clientName, setClientName] = useState('');
  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    socket.on('newMessage', (msg) => {
      if (
        msg.senderId === clientName ||
        msg.recipientId === clientName ||
        msg.sender === 'admin'
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    return () => {
      socket.off('newMessage');
    };
  }, [clientName]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || !clientName) return;

    const newMessage = {
      text: input.trim(),
      sender: 'user',
      senderId: clientName,
      timestamp: new Date().toISOString(),
    };

    socket.emit('sendMessage', newMessage);
    setInput('');
// Don't update messages locally — let the 'newMessage' event handle it
  };

  if (!nameSubmitted) {
    return (
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          width: 320,
          p: 3,
          background: '#fff',
          borderRadius: 2,
          boxShadow: 6,
          zIndex: 1500,
        }}
      >
        <Typography mb={1}>Enter your name to start the chat</Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Your name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && clientName.trim()) {
              setNameSubmitted(true);
              setMessages([
                {
                  id: 1,
                  text: 'Hi there! How can I help you today?',
                  sender: 'admin',
                  timestamp: new Date(),
                },
              ]);
            }
          }}
        />
      </Box>
    );
  }

  return (
    <>
      {!open && (
        <Tooltip title="Chat with us" placement="top">
          <IconButton
            onClick={() => setOpen(true)}
            sx={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              backgroundColor: '#D32F2F',
              color: 'white',
              '&:hover': { backgroundColor: '#B71C1C' },
              zIndex: 1500,
            }}
          >
            <ChatBubbleIcon />
          </IconButton>
        </Tooltip>
      )}

      <Slide direction="up" in={open} mountOnEnter unmountOnExit>
        <Box
          sx={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            width: 360,
            maxHeight: '80vh',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#fff',
            borderRadius: 3,
            boxShadow: 6,
            overflow: 'hidden',
            zIndex: 1500,
          }}
        >
          <Box
            sx={{
              p: 2,
              borderBottom: '1px solid #ddd',
              backgroundColor: '#D32F2F',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              color: '#fff',
            }}
          >
            <Typography variant="subtitle1">Velociraptor Chat</Typography>
            <IconButton size="small" onClick={() => setOpen(false)} sx={{ color: '#fff' }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Messages */}
          <Box
            sx={{
              flexGrow: 1,
              overflowY: 'auto',
              px: 2,
              py: 1,
              backgroundColor: '#fafafa',
            }}
          >
            {messages.map((msg, index) => (
              <MessageContainer
                key={index}
                sx={{
                  justifyContent:
                    msg.sender === 'user' ? 'flex-end' : 'flex-start',
                }}
              >
                {msg.sender === 'admin' && (
                  <Avatar
                    src={adminAvatar}
                    alt="Admin"
                    sx={{ width: 32, height: 32, mr: 1 }}
                  />
                )}
                <Box>
                  <MessageBubble elevation={1} isUser={msg.sender === 'user'}>
                    <Typography variant="body2">{msg.text}</Typography>
                  </MessageBubble>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ fontSize: '0.7rem', mt: 0.5 }}
                  >
                    {new Date(msg.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </Typography>
                </Box>
                {msg.sender === 'user' && (
                  <Avatar
                    src={userAvatar}
                    alt="You"
                    sx={{ width: 32, height: 32, ml: 1 }}
                  />
                )}
              </MessageContainer>
            ))}

            {isTyping && (
              <MessageContainer>
                <Avatar src={adminAvatar} sx={{ width: 32, height: 32, mr: 1 }} />
                <TypingIndicator>
                  <span></span>
                  <span></span>
                  <span></span>
                </TypingIndicator>
              </MessageContainer>
            )}

            <div ref={messagesEndRef} />
          </Box>

          {/* Input */}
          <Box sx={{ display: 'flex', borderTop: '1px solid #eee', p: 1 }}>
            <TextField
              fullWidth
              size="small"
              variant="outlined"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            />
            <IconButton onClick={handleSend} sx={{ color: '#D32F2F' }}>
              <SendIcon />
            </IconButton>
          </Box>
        </Box>
      </Slide>
    </>
  );
};

export default ChatWidget;
