import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box } from '@mui/material';
import { quizData } from './Quiz';


function Results() {
  const navigate = useNavigate();
  const results = JSON.parse(localStorage.getItem('quizResults') || '{}');
  const quizDataForCategory = quizData[results.category] || [];
  
  const score = quizDataForCategory.reduce((acc, question, index) => {
    return acc + (results.answers[index] === question.answer ? 1 : 0);
  }, 0);
  
  const percentage = (score / quizDataForCategory.length) * 100;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4">Quiz Results</Typography>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Category: {results.category?.toUpperCase()}
        </Typography>
        <Typography variant="h6">
          Score: {score} / {quizDataForCategory.length}
        </Typography>
        <Typography variant="h6">
          Percentage: {percentage.toFixed(2)}%
        </Typography>
        <Typography variant="h6">
          Date: {new Date(results.timestamp).toLocaleString()}
        </Typography>
        
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">Detailed Results:</Typography>
          {quizDataForCategory.map((q, i) => (
            <Box key={i} sx={{ my: 2 }}>
              <Typography>{i + 1}. {q.question}</Typography>
              <Typography>
                Your Answer: {results.answers[i] || 'Not answered'}
                {results.answers[i] === q.answer ? ' ✓' : ' ✗'}
              </Typography>
              {results.answers[i] !== q.answer && (
                <Typography>Correct Answer: {q.answer}</Typography>
              )}
            </Box>
          ))}
        </Box>
        
        <Button
          variant="contained"
          onClick={() => navigate('/dashboard')}
          sx={{ mt: 2 }}
        >
          Back to Dashboard
        </Button>
      </Box>
    </Container>
  );
}

export default Results;