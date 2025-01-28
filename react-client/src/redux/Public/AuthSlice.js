import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as userService from '../../Services/UserService.js';
import toast from 'react-hot-toast';
import { getError } from '../../utils/utils.js';
import * as UploadService from '../../Services/UploadService.js';
import * as UserService from '../../Services/UserService.js';

const token = sessionStorage.getItem('token')
  ? sessionStorage.getItem('token')
  : null;

const blankPictueUrl =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png';

const isAdmin = sessionStorage.getItem('isAdmin') === 'true' ? true : false;
const pic = sessionStorage.getItem('avatar');
const avatar = pic !== '' ? pic : blankPictueUrl;

const initialState = {
  loading: false,
  error: null,
  _id: sessionStorage.getItem('_id'),
  avatar: avatar,
  name: sessionStorage.getItem('name'),
  email: sessionStorage.getItem('email'),
  isAdmin: isAdmin,
  token,
};

export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const res = await userService.login(email, password);
      return res;
    } catch (err) {
      toast.error(getError(err));
      return rejectWithValue(err.message);
    }
  }
);
export const logOut = createAsyncThunk('logout', async () => {
  const res = await UserService.logout();
  toast.success(res.message);
  return res;
});

export const avatarUpload = createAsyncThunk('upload/profile', async (data) => {
  const res = await UploadService.uploadPic(data);
  return res;
});

export const updateUser = createAsyncThunk('users/update', async (data) => {
  const res = await UserService.edit(data._id, data);
  return res.user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { _id, name, isAdmin, email, token, avatar } = action.payload;
      state._id = _id;
      state.avatar = avatar;
      state.token = token;
      state.email = email;
      state.name = name;
      state.isAdmin = isAdmin;
    },
    setAvatar: (state, action) => {
      const { avatar } = action.payload;
      state.avatar = avatar;
      // sessionStorage.setItem('avatar', avatar);
    },
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [userLogin.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.token = payload.token;
      state._id = payload._id;
      state.email = payload.email;
      state.name = payload.name;
      state.isAdmin = payload.isAdmin;
      state.avatar = payload.avatar;
      toast.success('Successful Login');
    },
    [userLogin.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
      toast.error(getError(payload));
    },

    [avatarUpload.pending]: (state) => {
      state.loading = true;
    },
    [avatarUpload.fulfilled]: (state, action) => {
      state.loading = false;
      state.avatar = action.payload.secure_url;
      sessionStorage.setItem('avatar', action.payload.secure_url);
      toast.success('Image uploaded successfully. click Update to apply it');
    },
    [avatarUpload.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const { name, email, profile } = action.payload;
      state.avatar = profile.avatar;
      state.email = email;
      state.name = name;
      toast.success('Successful updated user');
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },

    [logOut.pending]: (state) => {
      state.loading = true;
    },
    [logOut.fulfilled]: (state) => {
      state.loading = false;
      state._id = null;
      state.email = null;
      state.avatar = null;
      state.token = null;
      state.name = null;
      state.isAdmin = false;
    },
    [logOut.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error;
      toast.error(getError(action.error));
    },
  },
});

export const { setCredentials, setAvatar } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentEmail = (state) => state?.auth?.email;
export const selectCurrentToken = (state) => state?.auth?.token;
export const selectUserImage = (state) => state?.auth?.avatar;
export const selectIsAdmin = (state) => state?.auth?.isAdmin;
