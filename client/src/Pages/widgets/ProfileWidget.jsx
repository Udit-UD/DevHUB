import { Box, Typography, Divider, useTheme } from '@mui/material';
import {
  ManageAccountsOutlined,
  LocationOnOutlined,
  WorkOutlineOutlined
} from "@mui/icons-material";
import ProfileImage from '../../Components/ProfileImage';
import FlexBetween from "../../Components/FlexBetween";
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import { useSelector } from 'react-redux';


export default function ProfileWidget({userId, picturePath}) {
  const {palette} = useTheme();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const token = useSelector((state)=>state.token);
  const dark = palette.neutral.dark;
  const medium = palette.neutral.medium;
  const main = palette.neutral.main;


  const getUser = async() => {
    const response = await fetch(`http://localhost:3000/users/${userId}`,{
      method: "GET",
      headers: { 
        Authorization: `Bearer ${token}`,
      },
      
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(()=>{
    getUser();
  }, []);

  if(!user){
    return null;
  }

  const {
    firstName, 
    lastName, 
    location, 
    occupation, 
    viewedProfile,
    impressions, 
    friends
  } = user;

  return (
    <WidgetWrapper>
      <FlexBetween 
        gap="0.5rem"
        pb="1.1rem"
        onClick = {()=>{navigate(`/profile/${userId}`)}}
      >
        <FlexBetween gap="1rem">
          <ProfileImage image={picturePath}>
          </ProfileImage>
            <Box>
              <Typography 
                variant='h4'
                color={dark}
                fontWeight="500"
                sx={{
                  "&:hover":{
                    color:palette.primary.light,
                    cursor:"pointer"
                  }
                }}
              >
                {firstName} {lastName}
              </Typography>
              {friends &&
              <Typography color={medium}>{friends.length} Friends</Typography>
              }
            </Box>
        </FlexBetween>
        <ManageAccountsOutlined />
      </FlexBetween>

      <Divider />

      <Box p="1rem 0">
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5">
                <LocationOnOutlined fontSize='large' sx={{color: main}}/>
                <Typography color={medium}>
                  {location}
                </Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="1rem" mb="0.5">
                <WorkOutlineOutlined fontSize='large' sx={{color: main}}/>
                <Typography color={medium}>
                  {occupation}
                </Typography>
        </Box>
      </Box>

      <Divider />

      <Box p="1rem 0">
          
      <FlexBetween mb="0.5rem">
                <Typography color={medium}>
                  Profile Views
                </Typography>
                <Typography color={main} fontWeight="500">
                  {viewedProfile}
                </Typography>
          </FlexBetween>
      <FlexBetween>
                <Typography color={medium}>
                  Impressions
                </Typography>
                <Typography color={main} fontWeight="500">
                  {impressions}
                </Typography>
          </FlexBetween>
      </Box>



    </WidgetWrapper>
  )
}
