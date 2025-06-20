import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { Box, Button, Card, CardContent, TextField, Typography, LinearProgress, IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';

const socket = io('http://localhost:5000'); // Adjust if backend is deployed elsewhere

const Chat = () => {
  const [email, setEmail] = useState('');
  const [matchId, setMatchId] = useState('');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [milestone, setMilestone] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [recording, setRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const messagesEndRef = useRef(null);

  const fetchMatchId = async () => {
    const res = await fetch(`/api/match/daily?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    if (data.match) setMatchId(data.match._id);
  };

  useEffect(() => {
    socket.on('chat message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });
    return () => {
      socket.off('chat message');
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() && matchId) {
      socket.emit('chat message', input);
      setMessages((prev) => [...prev, { text: input, self: true, type: 'text' }]);
      setInput('');
      // Track message in backend
      const res = await fetch('/api/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matchId, sender: email, text: input, type: 'text' }),
      });
      const data = await res.json();
      setMilestone(data.messageCount);
      setUnlocked(data.unlockedVideoCall);
    }
  };

  // Voice message logic
  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new window.MediaRecorder(stream);
    setMediaRecorder(recorder);
    setAudioChunks([]);
    recorder.start();
    setRecording(true);
    recorder.ondataavailable = (e) => {
      setAudioChunks((prev) => [...prev, e.data]);
    };
    recorder.onstop = async () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result;
        socket.emit('chat message', { type: 'voice', voiceUrl: base64, self: true });
        setMessages((prev) => [...prev, { type: 'voice', voiceUrl: base64, self: true }]);
        // Send to backend
        await fetch('/api/message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ matchId, sender: email, type: 'voice', voiceUrl: base64 }),
        });
      };
      reader.readAsDataURL(blob);
    };
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setRecording(false);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Chat</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Your Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <Button variant="contained" onClick={fetchMatchId}>Load Match</Button>
          </Box>
          <Box sx={{ border: '1px solid #ccc', height: 300, overflowY: 'auto', mb: 2, p: 1, borderRadius: 1 }}>
            {messages.map((msg, i) => (
              msg.type === 'voice' ? (
                <audio key={i} controls src={msg.voiceUrl} style={{ display: 'block', margin: '8px 0', float: msg.self ? 'right' : 'left' }} />
              ) : (
                <div key={i} style={{ textAlign: msg.self ? 'right' : 'left' }}>{msg.text || msg}</div>
              )
            ))}
            <div ref={messagesEndRef} />
          </Box>
          <form onSubmit={sendMessage} style={{ display: 'flex', gap: 8 }}>
            <TextField value={input} onChange={e => setInput(e.target.value)} fullWidth size="small" />
            <Button type="submit" variant="contained">Send</Button>
            {!recording ? (
              <IconButton color="primary" onClick={startRecording}><MicIcon /></IconButton>
            ) : (
              <IconButton color="error" onClick={stopRecording}><StopIcon /></IconButton>
            )}
          </form>
          <Box sx={{ mt: 2 }}>
            <Typography>Messages: {milestone} / 100</Typography>
            <LinearProgress variant="determinate" value={Math.min(milestone, 100)} sx={{ height: 8, borderRadius: 5 }} />
            {unlocked && <Typography color="success.main" sx={{ mt: 1 }}>🎉 Video call unlocked!</Typography>}
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Chat; 