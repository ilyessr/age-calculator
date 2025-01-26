import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material'
import './App.css'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react';

type FormValues = {
  birthDate: string;
};

function App() {

  const [age, setAge] = useState<number | null>(null);
  const { control, handleSubmit } = useForm<FormValues>();

  const onSubmit = ({ birthDate }: FormValues) => {
    const birth = new Date(birthDate);
    const today = new Date();

    const calculatedAge =
      today.getFullYear() -
      birth.getFullYear() -
      (today < new Date(today.getFullYear(), birth.getMonth(), birth.getDate()) ? 1 : 0);

    setAge(calculatedAge);
  };

  return (
    <Container >
      <Paper sx={{ p: 2 }}>
        <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
          Age Calculator
        </Typography>

        <Typography variant="body1" component="h2" className="" sx={{ mb: 4 }}>
          Calculate your exact age by entering your birth date below.
        </Typography>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="birthDate"
            control={control}
            defaultValue=""
            rules={{
              required: "Birth date is required",
              validate: (value) => {
                const birthDate = new Date(value);
                if (birthDate > new Date()) return "Birth date cannot be in the future.";
                return true;
              },
            }}

            render={({ field, fieldState }) => (
              <TextField
                {...field}
                id="birthDate"
                label="Enter your birth date"
                type="date"
                error={!!fieldState.error}
                helperText={fieldState.error ? fieldState.error.message : ""}
                slotProps={{ inputLabel: { shrink: true } }}
                sx={{ mb: 2 }}
                fullWidth
              />
            )}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className="w-full"
          >
            Calculate Age
          </Button>
          {age !== null && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" component="p" color="success.main">
                Your age is: {age} years
              </Typography>
            </Box>
          )}
        </Box>
      </Paper>
    </Container >

  )
}

export default App
