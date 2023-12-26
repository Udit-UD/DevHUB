import {useState} from 'react';
import {
    ChatBubbleOutlineOutlined, 
    FavoriteBorderOutlined, 
    FavoriteOutlined, 
    ShareOutlined,
    Send,
} from "@mui/icons-material";
import {Box, IconButton, InputBase, Typography, useTheme} from "@mui/material";
import FlexBetween from '../../Components/FlexBetween';
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { useDispatch, useSelector } from 'react-redux';
import { Friend } from '../../Components/Friend';
import ProfileImage from '../../Components/ProfileImage';
import { Comment } from "../../Components/Comment";
import { setComments } from '../../state';

export const PostWidget = ({
    postId, 
    postUserId,
    name, 
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    userPicture,
    comments
}) => {
    const [isComments, setIsComments] = useState(false);
    const dispatch = useDispatch();
    const token = useSelector((state)=> state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]);
    const likeCount = Object.keys(likes).length;
    const [comment, setComment] = useState("");

    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    
    const patchLike = async() => {
        const response = await fetch(`http://localhost:3000/posts/${postId}/like`,{
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-type": "application/json",
            },
            body: JSON.stringify({userId: loggedInUserId})
        });
        const updatePost = await response.json();
        dispatch(setPost({ post: updatePost }));
    }

    const handleComment = async() => {
        try{
            const formData = new FormData();
            formData.append("userId", loggedInUserId);
            formData.append("text", comment);
            const response = await fetch(`http://localhost:3000/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                body: formData,
            });
            const data = await response.json();
            console.log(data);
            dispatch(setComments({comment: data}));
            setComment("");    
        }
        catch(err){
            console.log("Error Occured!", err.message);
        }
    }

  return (
    <WidgetWrapper mt="1rem">
        <Friend friendId={postUserId} name={name} subtitle={location} userPicturePath={userPicturePath}/>
        <Typography color={main} sx={{ mt: "1rem"}}>
            {description}
        </Typography>
        {
            picturePath && (
                <img 
                    width="100%"
                    height="auto"
                    style={{marginTop:"0.5rem"}}
                    alt="post"
                    src={`http://localhost:3000/assets/${picturePath}`}
                />
            )
        }
        <FlexBetween mt="0.25rem">
            <FlexBetween gap="1rem">
                <FlexBetween gap="0.3rem">
                    <IconButton onClick={patchLike}>
                        {isLiked ? (
                            <FavoriteOutlined sx={{color: primary}} />
                            ) : (
                            <FavoriteBorderOutlined />
                        )}
                    </IconButton>
                    <Typography>{likeCount}</Typography>
                </FlexBetween> 
            </FlexBetween>
            <FlexBetween gap="0.3rem">
                <IconButton onClick={() => setIsComments(!isComments)}>
                    <ChatBubbleOutlineOutlined />
                </IconButton>
                <Typography>{comments.length}</Typography>
            </FlexBetween> 
            <IconButton>
                <ShareOutlined />
            </IconButton>                
        </FlexBetween>
        {isComments && (
            <Box mt="0.5rem">
                <FlexBetween gap="0.75rem" margin="0.5rem" marginBottom="1rem" >
                <ProfileImage image={userPicture} size='30px' />
                <FlexBetween width="100%" borderBottom="1px solid black">
                    <InputBase
                        placeholder="Drop your comments..."
                        onChange={(e)=> setComment(e.target.value)}
                        value={comment}
                        sx={{
                            width: "90%",
                            backgroundColor: "transparent",
                            padding: "0.3rem 1rem",
                        }}
                    />
                    <Send onClick={handleComment} sx={{"cursor": "pointer"}}/>
                </FlexBetween>
                
            </FlexBetween>
                {comments.map((comment, i) => (
                    <Box key={comment._id} mb="1rem">
                    <Comment postId={postId} userId={comment.userId} userName={comment.userName} occupation={comment.occupation} picturePath={comment.picturePath} text={comment.text}/>
                    </Box>
                ))}
            </Box>
        )}
            
    </WidgetWrapper>
  )
}
