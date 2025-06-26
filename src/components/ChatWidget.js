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
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi there! How can I help you today?',
      sender: 'admin',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [open, setOpen] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: input.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput('');
    simulateAdminResponse();
  };

  const simulateAdminResponse = () => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Thanks! We'll respond shortly.",
          sender: 'admin',
          timestamp: new Date(),
        },
      ]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <>
      {/* Floating Chat Toggle Button */}
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

      {/* Chat Panel */}
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
          {/* Header */}
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
            {messages.map((msg) => (
              <MessageContainer
                key={msg.id}
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
                    {msg.timestamp.toLocaleTimeString([], {
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
