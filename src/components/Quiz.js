import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Box,
  LinearProgress,
} from '@mui/material';
// Sample quiz data
export const quizData = {
  general: [
    { question: 'What is 2+2?', options: ['3', '4', '5'], answer: '4' },
  ],
  science: [
    { question: 'What is H2O?', options: ['Water', 'Salt', 'Sugar'], answer: 'Water' },
  ],
  sports: [
    { question: 'What is H2O?', options: ['Water', 'Salt', 'Sugar'], answer: 'Water' },
  ],
  history: [
    { question: 'What is H2O?', options: ['Water', 'Salt', 'Sugar'], answer: 'Water' },
  ],
};


function Quiz() {
  const { category } = useParams();
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(30);

  const questions = quizData[category] || [];

  // Memoize handleNext with useCallback
  const handleNext = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
    } else {
      localStorage.setItem('quizResults', JSON.stringify({
        category,
        answers,
        timestamp: new Date().toISOString(),
      }));
      navigate('/results');
    }
  }, [currentQuestion, questions.length, category, answers, navigate]); // Add all dependencies

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      handleNext();
    }
  }, [timeLeft, handleNext]); // Now handleNext is a stable dependency

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestion]: answer });
  };

  if (!category || !quizData[category.toLowerCase()]) {
    return <Typography>Invalid category. Please select a valid quiz.</Typography>;
  }

  if (!questions.length) return <Typography>Category not found</Typography>;

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Typography variant="h5">{category.toUpperCase()} Quiz</Typography>
        <Typography>Time Left: {timeLeft}s</Typography>
        <LinearProgress variant="determinate" value={progress} sx={{ my: 2 }} />
        <Typography variant="h6">
          {currentQuestion + 1}. {currentQ.question}
        </Typography>
        <RadioGroup onChange={(e) => handleAnswer(e.target.value)}>
          {currentQ.options.map((option) => (
            <FormControlLabel
              key={option}
              value={option}
              control={<Radio />}
              label={option}
            />
          ))}
        </RadioGroup>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{ mt: 2 }}
          disabled={!answers[currentQuestion]}
        >
          {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
        </Button>
      </Box>
    </Container>
  );
}

export default Quiz;