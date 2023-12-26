import React from 'react';
import { useSelector } from 'react-redux';
import { Box, useMediaQuery } from '@mui/material';
import ProfileWidget from '../widgets/ProfileWidget';
import { NewPostWidget } from '../widgets/NewPostWidget';
import { PostsWidget } from '../widgets/PostsWidget';
import { MyFriendWidget } from '../widgets/MyFriendWidget';
import { Navbar } from '../navBar/Navbar';


export default function HomePage() {
  const {_id, picturePath} = useSelector((state)=>state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  return (
    <Box >
      <Navbar />
    <Box
      display={isNonMobileScreens ? "flex": "block"}
      justifyContent="space-between"
      width="100%"
      padding="2rem 6%"
      gap="0.5rem"
    >
      <Box flexBasis={isNonMobileScreens ? "24%": undefined}>
        <ProfileWidget userId={_id} picturePath={picturePath}/>
      </Box>
      <Box flexBasis={isNonMobileScreens ? "42%" : undefined} mt={isNonMobileScreens ? undefined: "2rem"}>
        <NewPostWidget picturePath={picturePath}/>
        <PostsWidget userId={_id} userPicture={picturePath} />
      </Box>
      {isNonMobileScreens && (
        <Box flexBasis="26%">
          <MyFriendWidget userId={_id} />  
        </Box>
      )}
    </Box>
    </Box>

  )
}
