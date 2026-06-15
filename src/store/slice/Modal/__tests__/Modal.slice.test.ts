import { ModalIDs, ModalOpenState, ModalState, appStore } from '@store';
import { act, renderHook } from '@testing-library/react';

describe('Modal slice', () => {
  const onModalCloseMock = jest.fn();

  it('should return modal selector state and actions', () => {
    const modal = renderHook(() => appStore()).result.current;

    expect(modal).toMatchSnapshot();
  });

  it('should return modal state with initial value', () => {
    const { result } = renderHook(() => appStore());

    expect(result.current.Modal).toMatchSnapshot();
  });

  it('should return modal state on modal data set using openModal', () => {
    const modalData: ModalState = {
      modalID: ModalIDs.SEARCH,
      onModalClose: onModalCloseMock,
      modalOpenState: ModalOpenState.OPEN,
    };

    const { result } = renderHook(() => appStore());

    act(() => {
      result.current.Modal.openModal(modalData);
      jest.runAllTimers();
    });

    expect(result.current.Modal).toMatchSnapshot();
  });

  it('should reset and close modal state on modal data set using closeModal', () => {
    const modalData: ModalState = {
      modalID: ModalIDs.SEARCH,
      onModalClose: onModalCloseMock,
      modalOpenState: ModalOpenState.OPEN,
    };
    const { result } = renderHook(() => appStore());

    act(() => {
      result.current.Modal.openModal(modalData);
      jest.runAllTimers();
    });
    expect(result.current.Modal.modalID).toEqual(modalData.modalID);
    expect(result.current.Modal.onModalClose).toEqual(modalData.onModalClose);

    act(() => {
      result.current.Modal.closeModal();
      jest.runAllTimers();
    });

    expect(result.current.Modal.modalID).toEqual(undefined);
    expect(result.current.Modal.onModalClose).toEqual(undefined);
  });
});
