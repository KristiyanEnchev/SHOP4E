import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: false,
  userAction: null,
  objectId: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isOpen = true;
      state.userAction = action.payload.action;
      state.objectId = action.payload.objectId;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.userAction = null;
      state.objectId = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
