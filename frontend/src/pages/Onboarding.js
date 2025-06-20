import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Step, StepLabel, Stepper, TextField, Typography } from '@mui/material';
import API_BASE_URL from '../utils/api';

const steps = [
  'Emotional Intelligence',
  'Psychological Traits',
  'Behavioral Patterns',
  'Relationship Values',
];

const Onboarding = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    email: '',
    name: '',
    password: '',
    onboarding: {
      emotionalIntelligence: '',
      psychologicalTraits: '',
      behavioralPatterns: '',
      relationshipValues: '',
    },
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (step === 0) setForm({ ...form, onboarding: { ...form.onboarding, emotionalIntelligence: value } });
    if (step === 1) setForm({ ...form, onboarding: { ...form.onboarding, psychologicalTraits: value } });
    if (step === 2) setForm({ ...form, onboarding: { ...form.onboarding, behavioralPatterns: value } });
    if (step === 3) setForm({ ...form, onboarding: { ...form.onboarding, relationshipValues: value } });
    if (name === 'email' || name === 'name' || name === 'password') setForm({ ...form, [name]: value });
  };

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}/api/onboarding`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setMessage(data.message || 'Submitted!');
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 6 }}>
      <Card elevation={4}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>Lone Town Onboarding</Typography>
          <Stepper activeStep={step} alternativeLabel sx={{ mb: 3 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <form onSubmit={handleSubmit}>
            {step === 0 && (
              <>
                <TextField label="Email" name="email" value={form.email} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Name" name="name" value={form.name} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} fullWidth margin="normal" required />
                <TextField label="Describe your emotional intelligence" value={form.onboarding.emotionalIntelligence} onChange={handleChange} fullWidth margin="normal" multiline required />
              </>
            )}
            {step === 1 && (
              <TextField label="Describe your psychological traits" value={form.onboarding.psychologicalTraits} onChange={handleChange} fullWidth margin="normal" multiline required />
            )}
            {step === 2 && (
              <TextField label="Describe your behavioral patterns" value={form.onboarding.behavioralPatterns} onChange={handleChange} fullWidth margin="normal" multiline required />
            )}
            {step === 3 && (
              <TextField label="Describe your relationship values" value={form.onboarding.relationshipValues} onChange={handleChange} fullWidth margin="normal" multiline required />
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              {step > 0 && <Button variant="outlined" onClick={handleBack}>Back</Button>}
              {step < steps.length - 1 && <Button variant="contained" onClick={handleNext}>Next</Button>}
              {step === steps.length - 1 && <Button variant="contained" type="submit">Submit</Button>}
            </Box>
          </form>
          {message && <Typography color="success.main" sx={{ mt: 2 }}>{message}</Typography>}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Onboarding; 