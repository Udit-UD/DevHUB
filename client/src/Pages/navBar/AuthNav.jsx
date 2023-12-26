import React from 'react';
import { 
  Typography,
  useTheme,
 } from '@mui/material';
import FlexBetween from '../../Components/FlexBetween';

export const AuthNav = () => {

  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;
  return (
    
    <FlexBetween padding="1rem 5%" backgroundColor={alt}>
      
      <FlexBetween gap="1.75rem">
      <FlexBetween flexDirection="column">
          <Typography 
            fontWeight="bold" 
            fontSize="clamp(1rem, 2rem, 1.25rem)"
            color="primary"
            onClick = {()=>navigate("/home")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer"
              }
            }}
          >
            Dev
          </Typography>
          <Typography color="yellow">HUB</Typography> 
        </FlexBetween>

      </FlexBetween>
    
    </FlexBetween>
  )
}
