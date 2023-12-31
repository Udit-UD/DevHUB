import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import {Box, Typography, useTheme} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { setFriends, setSelectedFriend } from "../state";
import FlexBetween from "./FlexBetween";
import ProfileImage from "./ProfileImage";

export const ChatFriend = ({friendId, name, subtitle, userPicturePath}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);

    const {palette} = useTheme();
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const patchFriend = async() => {
        try{
            const response = await fetch(
                `http://localhost:3000/users/${_id}/${friendId}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization:`Bearer ${token}`,
                        "Content-Type": "application/json",
                    }
                }
            )
            const data = await response.json();
            console.log(data);
            dispatch(setFriends({friends: data}));
        }
        catch(err){
            console.log(err.message);
        }
    }

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <ProfileImage image={userPicturePath} size="55px" />
                <Box
                    onClick = {()=> {
                        dispatch(setSelectedFriend({friendId}));
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight="550"
                        sx={{
                            "&:hover": {cursor: "pointer",
                            color: palette.primary.light}
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            
        </FlexBetween>
    )

}