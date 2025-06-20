import React, { useState } from 'react';
import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material';

const Feedback = () => {
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState('');

  const fetchFeedback = async () => {
    const res = await fetch(`/api/match/feedback?email=${encodeURIComponent(email)}`);
    const data = await res.json();
    setFeedback(data.feedback);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Match Feedback</Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField label="Your Email" value={email} onChange={e => setEmail(e.target.value)} fullWidth />
            <Button variant="contained" onClick={fetchFeedback}>Fetch Feedback</Button>
          </Box>
          <Typography>{feedback}</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Feedback; 