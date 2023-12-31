import React, {useEffect, useState} from 'react';
import {  
  IconButton, 
  InputBase,
  Typography,
  useTheme,
  useMediaQuery,
  Box,
  CircularProgress
 } from '@mui/material';
import {
  Search,
  Message, 
  DarkMode,
  LightMode,
  Notifications,
} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';
import { useDispatch, useSelector } from 'react-redux'; 
import { setMode, setLogout } from '../../state';
import { useNavigate, Link } from 'react-router-dom';
import FlexBetween from '../../Components/FlexBetween';
import { Friend } from '../../Components/Friend';

export const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
  const [searchStr, setSearchStr] = useState("");
  const [searchRes, setSearchRes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [toggle, setToggle] = useState(false);

  const theme = useTheme();
  const neutralLight = theme.palette.neutral.light;
  const dark = theme.palette.neutral.dark;
  const primaryLight = theme.palette.primary.light;
  const alt = theme.palette.background.alt;

  useEffect(() => {
    if (searchStr.trim() !== '' && toggle){
      ;(async() => {
        try {
          setIsLoading(true);
          const response = await fetch(`http://localhost:3000/users/searchuser?search=${searchStr}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`
            },
          });
          const data = await response.json();
          setSearchRes(data);
          setIsLoading(false);
        } catch (err) {
          console.log(err.message);
        }     
    })();
    }
  }, [searchStr]);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      const isOutsideSearchResults = !event.target.closest("#search-results-container");

      if (isOutsideSearchResults) {
        setToggle(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);


  return (
    
    <FlexBetween padding="1rem 5%" backgroundColor={alt}>
      
      <FlexBetween gap="1.75rem">
      <FlexBetween gap={"0.1rem"}>
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
          <Typography fontWeight="bold" 
            fontSize="clamp(1rem, 1.75rem, 1.0rem)"
            color={theme.palette.mode === "dark" ? "black" : "white"} bgcolor="orange" p="1px 3px" borderRadius="4px" >HUB</Typography> 
        </FlexBetween>
        
        {isNonMobileScreens && (
          <FlexBetween 
            backgroundColor = {neutralLight} 
            borderRadius= "9px"
            gap= "3rem"
            padding= "0.1rem 1.5rem"
            position="relative"
            id='search-results-container'
          >
            <InputBase placeholder='Search...' type='text' value={searchStr} onChange={(e) => {
              setSearchStr(e.target.value); 
            }} onFocus={() => {setToggle(true); setSearchRes([]);}}/>
            <IconButton >
              <Search />
            </IconButton>
            {
            toggle &&
            <Box 
              position="absolute" 
              zIndex="5" 
              top="100%" 
              display="flex" 
              bgcolor={neutralLight} 
              p="1.5rem 0rem"
              mt="-0.25rem"
              ml="-1.5rem"
              alignItems="flex-start"
              justifyContent="center"
              width="100%">
            {isLoading ? <CircularProgress /> : 
              ((searchRes.length === 0) ? <Typography> No results found </Typography> : 
              <Box width="100%" display="flex" flexDirection="column" gap="1rem" p="0rem 0.5rem">
                {
                  searchRes.map((result)=>
                    <Friend  
                      key={result._id}
                      friendId={result._id} 
                      name={`${result.firstName} ${result.lastName}`}
                      subtitle={result.occupation} 
                      userPicturePath={result.picturePath}
                    />
                  )}
                </Box> 
              )
              
            } 
            </Box>
            }
            
          </FlexBetween>
        )}
      </FlexBetween>

      {/* Desktop Nav */}
      {
        isNonMobileScreens ? (
          <FlexBetween gap="2rem">
            <IconButton onClick = {()=> dispatch(setMode())}>
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{fontSize: "25px"}} />
              ): (
                <LightMode sx={{color: dark, fontSize: "25px"}} />
              )}
            </IconButton>
            <IconButton onClick={()=>navigate("/messages")}>
            <Message sx={{fontSize: "25px", cursor: "pointer"}} />
            </IconButton>
            <Notifications sx={{fontSize: "25px", cursor: "pointer"}} />
            <LogoutIcon sx={{fontSize: "25px", cursor: "pointer"}} onClick = {() => {dispatch(setLogout());
            }} />

          </FlexBetween>
        ) :
        (
          <IconButton >
            <LogoutIcon />
          </IconButton>
        )
      }

    </FlexBetween>
  )
}
