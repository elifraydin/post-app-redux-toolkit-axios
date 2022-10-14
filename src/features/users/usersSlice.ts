import {createAsyncThunk, createSlice, nanoid, PayloadAction} from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {UsersObject} from "../../types/interfaces"
import axios from "axios"

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

const initialState: UsersObject[] = []

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  try {
    const response = await axios.get(USERS_URL);
    return response.data;
  } catch (error: any) {
    return error.message;
  }
})

export const usersSlice = createSlice({
    initialState,
    name: 'users',
    reducers: {
    //   addUser: {
    //     reducer(state, action: PayloadAction<UsersObject>) {
    //       state.push(action.payload)
    //     },
    //     prepare(name) {
    //       return {
    //         payload: {
    //           id: nanoid(),
    //           name,
    //         }
    //     }
    //   }
    // }
  },
  extraReducers(builder) {
      builder.addCase(fetchUsers.fulfilled, (state, action) => {
        return action.payload;
      })
  },
})

export const getAllUsers = (state: RootState) => state.users

//export const {addUser} = usersSlice.actions;
export default usersSlice.reducer;
