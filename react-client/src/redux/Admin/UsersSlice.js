import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import * as UserService from '../../Services/UserService.js';
import { getError } from '../../utils/utils.js';

const initialState = {
  users: [],
  loading: false,
  error: null,
};
window.alert = function () {};

export const createUser = createAsyncThunk('users/create', async (user) => {
  const res = await UserService.create(user);
  return res;
});
export const retrieveUsers = createAsyncThunk('users/retrieve', async () => {
  const res = await UserService.getUsers();
  return res;
});
export const updateUser = createAsyncThunk('users/update', async (data) => {
  const res = await UserService.edit(data._id, data);
  return res.user;
});
export const deleteUser = createAsyncThunk('users/delete', async (id) => {
  await UserService.deleteRequest(id);
  return id;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  reducers: {
    searchByName: (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) =>
          user.firstName.toLowerCase().includes(action.payload.toLowerCase())
        ),
      };
    }
  },
  extraReducers: {
    [retrieveUsers.pending]: (state) => {
      state.loading = true;
    },
    [retrieveUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload;
    },
    [retrieveUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [createUser.pending]: (state) => {
      state.loading = true;
    },
    [createUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
      toast.success('Successfuly created user');
    },
    [createUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user._id === action.payload._id
      );
      state.users[index] = {
        ...state.users[index],
        ...action.payload,
      };

      toast.success('Successful updated user');
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      const index = state.users.findIndex(
        (user) => user._id === action.payload
      );
      state.users.splice(index, 1);
      toast.success('Successfuly deleted user');
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },
  },
});

export const { searchByName } = usersSlice.actions;

export const selectUsers = (state) => state?.users;

export default usersSlice.reducer;
