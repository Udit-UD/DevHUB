import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../../state';
import { PostWidget } from './PostWidget';

export const PostsWidget = ({userId, userPicture ,isProfile = false}) => {
  const dispatch = useDispatch();
  const posts = useSelector((state)=> state.posts);
  const token = useSelector((state)=> state.token);

  const getPosts = async () => {
    const response = await fetch(`http://localhost:3000/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    const sortedPosts = data.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    dispatch(setPosts({ posts: sortedPosts }));
  }


  const getUserPosts = async() => {
    const response = await fetch(`http://localhost:3000/posts/${userId}/posts`,{
      method: "GET",
      headers: {Authorization: `Bearer ${token}`},
    });
    const data = await response.json();
    dispatch(setPosts({posts: data}));
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
        {posts.map(
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
        ))}
    </>
  )
}
