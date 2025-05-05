import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'AUTH' | null;

interface ModalState {
  activeModal: ModalType;
  modalProps?: Record<string, any>;
}

const initialState: ModalState = {
  activeModal: null,
  modalProps: {},
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ type: ModalType; props?: Record<string, any> }>
    ) => {
      state.activeModal = action.payload.type;
      state.modalProps = action.payload.props || {};
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalProps = {};
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
