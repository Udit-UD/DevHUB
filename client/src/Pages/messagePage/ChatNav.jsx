import React from 'react';
import FlexBetween from '../../Components/FlexBetween';
import ProfileImage from '../../Components/ProfileImage';
import { Box, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { setSelectedFriend } from '../../state';
import { useDispatch } from 'react-redux';

export const ChatNav = ({friend}) => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const dispatch = useDispatch();


  return (
    <>
      {friend ? (
        <FlexBetween
          gap="0.5rem"  
          width="100%"
          p="1rem"
        >
          <FlexBetween gap="1rem">
            <ProfileImage image={friend.picturePath} size="40px" />
            <Box>
              <Typography
                variant="h5"
                color={dark}
                onClick={() => {
                  navigate(`/profile/${friend._id}`);
                }}
                fontWeight="500"
                sx={{
                  '&:hover': {
                    color: palette.primary.light,
                    cursor: 'pointer',
                  },
                }}
              >
                {friend.firstName} {friend.lastName}
              </Typography>
              <Typography variant='h7' color={medium}>
                {friend.occupation}
              </Typography>
            </Box>
          </FlexBetween>
          <Box mr="1rem">
            <Typography variant='h4' color={medium}  onClick={()=>{dispatch(setSelectedFriend({friendId: null}))}}>
              <CloseIcon cursor="pointer"/>
            </Typography>
          </Box>
        </FlexBetween>
      ) : (
        <FlexBetween>No friend selected!</FlexBetween>
      )}
    </>
  );
};
