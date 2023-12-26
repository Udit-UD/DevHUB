import React from 'react'
import { useTheme, Typography, Container, Box, useMediaQuery} from '@mui/material';
import { Form } from './Form';
import { AuthNav } from '../navBar/AuthNav';

export default function LoginPage() {
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)")
  const theme = useTheme();
  const alt = theme.palette.background.alt;
  const dark = theme.palette.neutral.dark;

  return (
    <Box >
      <AuthNav />
    <Container sx={{ width: `${isNonMobileScreens ? "40%" : "93%"}`, marginTop: "5vh", padding:"2rem", borderRadius: "10px", backgroundColor: `${alt}`}}>
      <Typography 
        fontWeight="bold"
        fontSize="clamp(1.25rem, 1.5rem, 1.75rem)"
        color= {dark}
        textAlign="center"
      >
        Authentication
      </Typography>
      <Typography
      variant="body1"
      color="textSecondary"
      textAlign="center"
      marginTop="0.5rem"
    >
      Welcome to DevHub, the social-media for Developers!

    </Typography>

    <Form />

    </Container>
    </Box>

  )
}
