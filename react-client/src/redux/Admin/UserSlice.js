import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as UserService from '../../Services/UserService.js';
import { getError } from '../../utils/utils.js';

export const findUserById = createAsyncThunk('users/findById', async (id) => {
  const res = await UserService.getUserById(id);
  return res;
});

const initialState = {
  user: {},
  loading: true,
  error: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: {
    [findUserById.pending]: (state) => {
      state.loading = true;
    },
    [findUserById.fulfilled]: (state, action) => {
      state.loading = false;
      // state.user = action.payload;
      state.user = {
        avatar: action.payload.profile.avatar,
        firstName: action.payload.profile.firstName,
        lastName: action.payload.profile.lastName,
        name: action.payload.name,
        email: action.payload.email,
        isAdmin: action.payload.isAdmin,
        createdAt: action.payload.createdAt,
        _id: action.payload._id,
        updatedAt: action.payload.updatedAt,
      };
    },
    [findUserById.rejected]: (state, action) => {
      state.loading = true;
      state.error = action.arror;
      toast.error(getError(action.arror));
    },
  },
});

export const { setUser } = userSlice.actions;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
