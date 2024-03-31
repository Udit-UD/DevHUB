import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mode: "dark", 
    user: null,
    token: null,
    posts: [],
    selectedFriend: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode:(state) => {
            state.mode = state.mode === "light" ? "dark": "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.token = null;
            state.user = null;
        },
        setFriends: (state, action) => {
            if(state.user){
                state.user.friends = action.payload.friends;
            }
            else{
                console.log("No friends found!");
            }
        },
        setSelectedFriend: (state, action) => {
            if(state.user){
                if(action.payload.friendId)
                    state.selectedFriend = action.payload.friendId;
                else
                    state.selectedFriend = null;
            }
        },  
        setPosts: (state, action) => {
            state.posts = action.payload.posts.reverse();
        },
        setComments: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if(post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const {setMode, setFriends, setLogin, setLogout, setPost, setPosts, setComments, setSelectedFriend} = authSlice.actions;
export default authSlice.reducer;