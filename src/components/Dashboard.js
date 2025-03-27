import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Grid } from '@mui/material';

const categories = ['General', 'Science', 'History', 'Sports'];

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')) || { username: 'Guest' };


  return (
    <Container>
      <Typography variant="h4" sx={{ my: 4 }}>
        Welcome, {user?.username}!
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={12} sm={6} key={category}>
            <Button
              variant="contained"
              fullWidth
              sx={{ py: 2 }}
              onClick={() => navigate(`/quiz/${category.toLowerCase()}`)}
            >
              {category}
            </Button>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
 export default Dashboard