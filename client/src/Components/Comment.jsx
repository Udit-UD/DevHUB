import {Box, Typography, useTheme, IconButton} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ProfileImage from "./ProfileImage";

export const Comment = ({text, userId ,userName, picturePath}) => {
    const navigate = useNavigate();
    const {palette} = useTheme();
    const main = palette.neutral.main;
    

    return (
        <Box>
            <Box display="flex" gap="0.5rem"  alignItems="center">
                <ProfileImage image={picturePath} size="40px" />
                <Box
                    onClick = {()=> {
                        navigate(`/profile/${userId}`);
                        navigate(0);
                    }}  
                >
                    <Typography
                        color={main}
                        fontSize="0.85rem"
                        fontWeight="550"
                        sx={{
                            "&:hover": {cursor: "pointer",
                            color: palette.primary.light}
                        }}
                    >
                        {userName}
                    </Typography>
                    <Box>
                    <Typography color={main} fontSize="0.9rem">
                        {text}
                    </Typography>
                    </Box>
                </Box>
            </Box>
           
        </Box>
    )

}