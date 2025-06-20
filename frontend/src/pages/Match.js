import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography, Chip } from '@mui/material';
import API_BASE_URL from '../utils/api';

const Match = () => {
  const [email, setEmail] = useState('');
  const [match, setMatch] = useState(null);
  const [message, setMessage] = useState('');

  const fetchMatch = async () => {
    const res = await fetch(`${API_BASE_URL}/api/match/daily?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    setMatch(data.match);
    setMessage(data.message || '');
  };

  const handleUnpin = async () => {
    const res = await fetch(`${API_BASE_URL}/api/match/unpin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setMessage(data.message);
    setMatch(null);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Today's Match</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Your Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <Button variant="contained" onClick={fetchMatch}>Fetch Match</Button>
          </Box>
          {match ? (
            <Box>
              <Typography variant="h6">Matched with: {match.user1?.name} &amp; {match.user2?.name}</Typography>
              <Chip label={match.state} color={match.state === 'active' ? 'success' : 'warning'} sx={{ mt: 1 }} />
              <Button variant="outlined" color="error" sx={{ mt: 2 }} onClick={handleUnpin}>Unpin</Button>
            </Box>
          ) : (
            <Typography color="text.secondary">{message || 'No match found for today.'}</Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Match; 