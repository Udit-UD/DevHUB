import { Box, Typography, useTheme } from '@mui/material';
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFriends } from '../../state';
import { Friend } from '../../Components/Friend';


export const MyFriendWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token  = useSelector((state) => state.token);
  const friends = useSelector((state)=>state.user.friends);

  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;

  const getUserFriends = async()=>{
    try{
        const response = await fetch(`http://localhost:3000/users/${userId}/friends`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
      });

        if(!response.ok){
            throw new Error(`Failed to fetch friends: ${response.status}`);
        }
        const data = await response.json();
        const updatedFriends = Array.isArray(data) ? data : [];

        dispatch(setFriends({ friends: updatedFriends }));
    }
    catch(err){
        console.log( err);
    }
  }

  useEffect(()=>{
    getUserFriends();
  }, [])

  return (
    <WidgetWrapper>
        <Box mb="1.5rem">
            <Typography 
            variant='h4'
            color={dark}
            fontWeight="500"
            >
                Your Friends
            </Typography>
        </Box>
        {
            friends.length === 0 ? 
            (
                <Typography 
                    variant='h5'
                    color={medium}
                    fontWeight="400"
                    mb="1.5rem"
                >
                    You don't have any friends now {":("}
                </Typography>
            ) : 
            (
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {
                friends.map((friend) => (
                    <Friend  
                        key={friend._id}
                        friendId={friend._id} 
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation} 
                        userPicturePath={friend.picturePath}
                    />
                ))
                
                }
            </Box>
            )
        }

        
    </WidgetWrapper>
  )
}
