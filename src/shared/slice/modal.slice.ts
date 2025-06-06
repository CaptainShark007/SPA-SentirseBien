import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type ModalType = 'AUTH' | 'CREATE-USER' | 'DELETE-USER';

export interface ModalPropsMap {
  AUTH: undefined;
  'CREATE-USER': undefined;
  'DELETE-USER': {
    id: number;
    nombre: string;
    apellido: string;
    empleado: string;
    email: string;
  };
}

type ModalPayload<K extends ModalType = ModalType> = {
  type: K;
  props?: ModalPropsMap[K];
};

interface ModalState {
  activeModal: ModalType | null;
  modalProps: ModalPropsMap[ModalType] | undefined;
}

const initialState: ModalState = {
  activeModal: null,
  modalProps: undefined,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: <K extends ModalType>(
      state: ModalState,
      action: PayloadAction<ModalPayload<K>>
    ) => {
      state.activeModal = action.payload.type;
      state.modalProps = action.payload.props || undefined;
    },
    closeModal: (state) => {
      state.activeModal = null;
      state.modalProps = undefined;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
