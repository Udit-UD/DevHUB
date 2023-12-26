import { Box } from "@mui/material";
import DefaultImg from "../assets/defaultImg.png"
import { useEffect, useState } from "react";

const ProfileImage = ({image, size="60px"}) => {
    const [imgSrc, setImgSrc] = useState(`http://localhost:3000/assets/${image}`);
    useEffect(()=>{
        const checkImgExistance = async() => {
            try {
                const response = await fetch(imgSrc);
                if(!response.ok){
                    setImgSrc(DefaultImg);
                }
            } catch (error) {
                console.log("Error while fetching Image!");
                setImgSrc(DefaultImg);
            }
        }
        checkImgExistance();
    }, [imgSrc])
    return(

        <Box width={size} height={size}>
            <img
             style={{objectFit: "cover", borderRadius: "50%"}}
             width={size}
             height={size}
             src={imgSrc}
             alt="profile" />
        </Box>
    )
}

export default ProfileImage;