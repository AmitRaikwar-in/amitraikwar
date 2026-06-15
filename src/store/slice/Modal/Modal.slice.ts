import { AppStoreSlice } from '../../appStore/types';
import { ModalState, ModalStateSlice, ModalOpenState } from './types';

const initialAlertState: ModalState = {
  modalID: undefined,
  onModalClose: undefined,
  modalOpenState: ModalOpenState.CLOSE,
};

const createModalSlice: AppStoreSlice<ModalStateSlice> = (set, get) => ({
  ...initialAlertState,
  openModal: (modalData) => {
    set((state) => {
      state.Modal.modalID = modalData.modalID;
      state.Modal.onModalClose = modalData.onModalClose;
      state.Modal.modalOpenState = ModalOpenState.OPEN;
    });
  },
  closeModal: () => {
    const onModalClose = get().Modal.onModalClose;
    if (onModalClose) {
      onModalClose();
    }
    set((state) => {
      state.Modal.modalOpenState = ModalOpenState.CLOSE;
    });
    setTimeout(() => {
      set((state) => {
        state.Modal.modalOpenState = initialAlertState.modalOpenState;
        state.Modal.modalID = initialAlertState.modalID;
        state.Modal.onModalClose = initialAlertState.onModalClose;
      });
    }, 500 /* 0.5s */);
  },
});

export default createModalSlice;
