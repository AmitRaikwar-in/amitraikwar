import { StateCreator } from 'zustand';
import { ModalStateSlice, SearchStateSlice } from '../slice';

export interface AppStoreState {
  Modal: ModalStateSlice;
  Search: SearchStateSlice;
}

export type AppStoreSlice<T> = StateCreator<
  AppStoreState,
  [['zustand/immer', never]],
  [],
  T
>;
