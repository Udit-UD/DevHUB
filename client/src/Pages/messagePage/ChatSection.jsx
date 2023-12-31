import React from 'react'
import { WidgetWrapper } from '../../Components/WidgetWrapper'
import { useTheme } from '@mui/material'

export const ChatSection = () => {
  const {palette} = useTheme();
  const bg = palette.background;
  return (
    <WidgetWrapper sx={{bgcolor:{bg}}}>
        
    </WidgetWrapper>
  )
}
