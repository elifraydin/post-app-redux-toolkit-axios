import { createSlice, nanoid, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"
import { sub } from "date-fns";
import { RootState } from "../../store/store";
import { reactionEmoji } from "../../components/ReactionButton";
import { Posts, PostsProps } from "../../types/interfaces";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";


const initialState: Posts = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  try {
    const response = await axios.get(POSTS_URL);
    console.log("data alındı")
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

export const addNewPosts = createAsyncThunk("posts/addNewPosts", async (initialPost: Pick<PostsProps, "title" | "body" | "userId">) => {
  try {
    const response = await axios.post(POSTS_URL, initialPost);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
});

export const postsSlice = createSlice({
  initialState,
  name: "posts",
  reducers: {
    // addPost: {
    //   reducer(state, action: PayloadAction<PostsProps>) {
    //     state.data.push(action.payload);
    //   },
    //   prepare({ title, body, userId }) {
    //     return {
    //       payload: {
    //         id: nanoid(),
    //         title,
    //         body,
    //         userId,
    //         date: new Date().toISOString(),
    //         reactions: {
    //           thumbsUp: 0,
    //           wow: 0,
    //           heart: 0,
    //           rocket: 0,
    //           coffee: 0,
    //         },
    //       },
    //     };
    //   },
    // },
    addReaction(state, action) {
      const { postId, reaction } = action.payload;
      const existingPost = state.data.find((post) => post.id == postId);
      if (existingPost) {
        existingPost.reactions[reaction as keyof typeof reactionEmoji]++;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";

        let min = 1;
        const loadedPosts = action.payload.map((post: PostsProps) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
          };
          return post;
        });
        state.data = state.data.concat(loadedPosts);
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addNewPosts.fulfilled, (state, action) => {
        action.payload.id=nanoid();
        action.payload.userId = Number(action.payload.userId);
        action.payload.date = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
            wow: 0,
            heart: 0,
            rocket: 0,
            coffee: 0,
        }
        console.log(action.payload)
        state.data.push(action.payload);
      });
      
  },
});

export const getAllPosts = (state: RootState) => state.posts.data;
export const getPostStatus = (state: RootState) => state.posts.status;
export const getPostError = (state: RootState) => state.posts.error;

export const { addReaction} = postsSlice.actions;
export default postsSlice.reducer;
