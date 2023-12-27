import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import { PostWidget } from './PostWidget';
import { WidgetWrapper } from '../../Components/WidgetWrapper';
import { CircularProgress, Box } from '@mui/material';

export const PostsWidget = ({userId, userPicture ,isProfile = false}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state)=> state.posts);
  const token = useSelector((state)=> state.token);
  const [loading, setLoading] = useState(false);

  const getPosts = async () => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
    setLoading(false);
  }

  const getUserPosts = async() => {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/posts/${userId}/posts`,{
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({posts: data}));
    setLoading(false);
  }

  useEffect(()=>{
    if(isProfile){
      getUserPosts();
    }else{
      getPosts();
    }
  }, []);
  return (
    <>
        {
          loading ? 
          <WidgetWrapper mt="1.5rem" height="13vh" display="flex" justifyContent="center" >
              <CircularProgress /> 
          </WidgetWrapper> 
          : (posts.length === 0) ? 
          <WidgetWrapper height="50vh" display="flex"  alignItems= "center" justifyContent="center"> 
              Boi haven't Posted Anything yet!
          </WidgetWrapper> 
          
          :
        posts.map(
          ({
          _id,
          userId,
          firstName,
          lastName, 
          location,
          description,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget key={_id} 
            postId={_id}
            postUserId = {userId}
            name = {`${firstName} ${lastName}`}
            description = {description}
            location = {location}
            picturePath = {picturePath}
            userPicturePath = {userPicturePath}
            likes = {likes}
            comments = {comments}
            userPicture = {userPicture}
          />
        ))
        }
    </>
  )
}
