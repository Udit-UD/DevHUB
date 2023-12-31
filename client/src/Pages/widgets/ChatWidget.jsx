import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { Box, CircularProgress, Typography, useTheme,Button, InputBase } from '@mui/material';
import { ChatNav } from '../messagePage/ChatNav';
import SendIcon from '@mui/icons-material/Send';
import FlexBetween from '../../Components/FlexBetween';


export const ChatWidget = () => {
  const friendId = useSelector((state) => state.selectedFriend);
  const token = useSelector((state) => state.token);
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const primary = palette.primary.main;
  const [message, setMessage] = useState("");
  const background = palette.background.default;

  const [friend, setFriend] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFriend = async () => {
    try {
      if(friendId){
        const response = await fetch(`http://localhost:3000/users/${friendId}`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await response.json();
        setFriend(data);
      }
      else{
        return null;
      }
      
    } catch (error) {
      console.log(error.message);
      setError('Error fetching friend data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getFriend();
  }, [friendId]);

  return (
    <WidgetWrapper sx={{p:"0rem"}} >
      {loading ? (
        <Box width="100%" display={"flex"} minHeight="80vh" alignItems={"center"} justifyContent="center"><CircularProgress /></Box>
        
      ) : friend && friendId ? (
        <Box width="100%" minHeight="80vh">
          <ChatNav friend={friend} />
          <Box width="100%" minHeight="70vh" position="relative"
          sx={{bgcolor: {background}, borderEndStartRadius:"0.75rem", borderStartEndRadius: "0.75rem"}}>
            <Box width="100%" display="flex" height="61vh" p="0.5rem" flexDirection="column" sx={{overflowY:"auto"}}>
              {/* LEFT: SENDER */}
              <Box width="100%" display="flex" justifyContent="flex-start" >
                <Box width="45%" p={"0.5rem"} borderRadius="0.5rem"bgcolor="orange" sx={{borderTopLeftRadius:"0rem"}} >  
                  <Typography textAlign="left">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam, cum, temporibus nobis repellendus, error possimus illum delectus quo ducimus quibusdam ipsum deserunt eum quidem architecto? Minus error labore ab delectus minima!
                  </Typography>
                </Box>
              </Box>
              {/* RIGHT: RECEIVER */}
              <Box width="100%" display="flex" justifyContent='flex-end'>
                <Box width="45%" p={"0.5rem"} borderRadius="0.5rem"  bgcolor="Pink" sx={{borderTopRightRadius:"0rem"}} >  
                    <Typography textAlign="left">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti magnam, cum, temporibus nobis repellendus, error possimus illum delectus quo ducimus
                    </Typography>
                  </Box>
              </Box>
            </Box>
            <FlexBetween width="98%" position="absolute" gap="1rem" bottom="0.5rem">
            <InputBase
                    placeholder="Your message..."
                    onChange={(e)=> setMessage(e.target.value)}
                    value={message}
                    sx={{
                        width: "90%",
                        backgroundColor: palette.neutral.light,
                        borderRadius: "1.5rem",
                        padding: "0.5rem 1rem",
                    }}
            />
            <Button sx={{borderRadius:"50%", padding:"0.5rem 1rem", backgroundColor: {primary}}} >
              <SendIcon color={medium} sx={{fontSize:"1.5rem"}}/>
            </Button>
              
            </FlexBetween>
          </Box>
        </Box>
      ) : (
        <Box width="100%" display={"flex"} minHeight="80vh" alignItems={"center"} justifyContent="center">No friend selected!</Box>
      )}
    </WidgetWrapper>
  );
};
