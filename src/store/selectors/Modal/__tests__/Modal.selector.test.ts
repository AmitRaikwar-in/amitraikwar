import { appStore } from '@store';
import { act, renderHook } from '@testing-library/react';
import { modalSelector } from '../Modal.selector';
import { ModalIDs, ModalOpenState, ModalState } from '@store';

jest.useFakeTimers();

describe('Modal selector', () => {
  const onModalCloseMock = jest.fn();

  it('should return modal selector state and actions', () => {
    const modal = renderHook(() => appStore(modalSelector)).result.current;

    expect(modal).toMatchSnapshot();
  });

  it('should return modal state with initial value', () => {
    const { result } = renderHook(() => appStore(modalSelector));

    expect(result.current).toMatchSnapshot();
  });

  it('should return modal state on modal data set using openModal', () => {
    const modalData: ModalState = {
      modalID: ModalIDs.SEARCH,
      onModalClose: onModalCloseMock,
      modalOpenState: ModalOpenState.OPEN,
    };
    const { result } = renderHook(() => appStore(modalSelector));

    act(() => {
      result.current.openModal(modalData);
    });

    expect(result.current.modalID).toMatchSnapshot();
  });

  it('should reset and close modal state on modal data set using closeModal', () => {
    const modalData: ModalState = {
      modalID: ModalIDs.SEARCH,
      onModalClose: onModalCloseMock,
      modalOpenState: ModalOpenState.OPEN,
    };
    const { result } = renderHook(() => appStore(modalSelector));

    act(() => {
      result.current.openModal(modalData);
    });
    expect(result.current.modalID).toEqual(modalData.modalID);
    expect(result.current.onModalClose).toEqual(modalData.onModalClose);

    act(() => {
      result.current.closeModal();
      jest.runAllTimers();
    });

    expect(result.current.modalID).toEqual(undefined);
    expect(result.current.onModalClose).toEqual(undefined);
  });
});
