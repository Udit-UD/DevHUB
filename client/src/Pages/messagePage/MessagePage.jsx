import React, { useEffect, useState } from 'react';
import {Navbar} from "../navBar/Navbar";
import { Box, useMediaQuery, useTheme, Typography, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from 'react-redux';
import { ChatWidget } from '../widgets/ChatWidget';
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { setFriends } from '../../state';
import { ChatFriend } from '../../Components/ChatFriend';
  
export const MessagePage = () => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token  = useSelector((state) => state.token);
  const userId = useSelector((state)=> state.user._id);
  const friends = useSelector((state)=>state.user.friends);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
  const [loading, setLoading] = useState(false);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;



  const getUserFriends = async()=>{
    try{
        setLoading(true);
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
        setLoading(false);
    }
    catch(err){
        setLoading(false);
        console.log( err.message );
    }
  }

  useEffect(()=>{
    getUserFriends();
  }, []);
  


  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="1rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "25%" : undefined}>
          <WidgetWrapper>
            <Box mb="1.5rem">
                <Typography 
                variant='h4'
                color={dark}
                fontWeight="500"
                textAlign="center"
                mb="1rem"
                >
                    Chat Space
                </Typography>
            </Box>
            {
                loading ? 
                <Box display="flex" justifyContent="center" mb="2rem">
                    <CircularProgress /> 
                </Box>
                :
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
                    friends.map((friend, index) => (
                        <ChatFriend  
                            key={friend._id || index}
                            friendId={friend._id} 
                            name={`${friend.firstName} ${friend.lastName}`}
                            subtitle={friend.occupation} 
                            userPicturePath={friend.picturePath}
                            showIcons={false}
                        />
                    ))
                    }
                </Box>
                )
            }
          </WidgetWrapper>
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "55%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <Box m="0rem 0" />  
          <ChatWidget />
        </Box>
      </Box>
    </Box>
  )
}
