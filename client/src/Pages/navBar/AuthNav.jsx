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
    
    <FlexBetween padding="1rem 5%" justifyContent="center" backgroundColor={alt}>
      
      <FlexBetween gap="1.75rem">
      <FlexBetween gap={"0.1rem"}>
          <Typography 
            fontWeight="bold" 
            fontSize="clamp(1rem, 2rem, 1.25rem)"
            color="primary"
            onClick = {()=>navigate("/")}
            sx={{
              "&:hover": {
                color: primaryLight,
                cursor: "pointer"
              }
            }}
          >
            Dev
          </Typography>
          <Typography fontWeight="bold" 
            fontSize="clamp(1rem, 1.75rem, 1.0rem)"
            color={theme.palette.mode === "dark" ? "black" : "white"} bgcolor="orange" p="1px 3px" borderRadius="4px" >HUB</Typography> 
        </FlexBetween>

      </FlexBetween>
    
    </FlexBetween>
  )
}
