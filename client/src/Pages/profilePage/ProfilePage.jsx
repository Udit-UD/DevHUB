import React, { useEffect, useState } from 'react';
import {Navbar} from "../navBar/Navbar";
import {Box, useMediaQuery} from "@mui/material";
import FlexBetween from '../../Components/FlexBetween';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { MyFriendWidget } from "../widgets/MyFriendWidget";
import { NewPostWidget } from "../widgets/NewPostWidget";
import {PostsWidget} from "../widgets/PostsWidget";
import ProfileWidget from "../widgets/ProfileWidget";
  
export const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

  const getUser = async() => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}`},
        }
      );
      const data = await response.json();
      setUser(data);
      console.log("done");
    } catch (error) {

      console.log("Error!!!", error);
    }
  }
  useEffect(()=>{
    getUser();
  }, []);
  if(!user) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreen ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
          <ProfileWidget userId={userId} picturePath={user.picturePath} />
          <Box m="2rem 0" />
          <MyFriendWidget userId={userId} />
        </Box>
        <Box
          flexBasis={isNonMobileScreen ? "42%" : undefined}
          mt={isNonMobileScreen ? undefined : "2rem"}
        >
          <Box m="2rem 0" />  
          <PostsWidget userId={userId} isProfile />
        </Box>
      </Box>
    </Box>
  )
}
