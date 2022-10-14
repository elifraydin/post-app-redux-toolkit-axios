import {combineReducers, configureStore, ThunkDispatch} from "@reduxjs/toolkit";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import postsSlice from "../features/posts/postsSlice"
import usersSlice from "../features/users/usersSlice"

export const store = configureStore({
  reducer: {
      posts: postsSlice,
      users:usersSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;