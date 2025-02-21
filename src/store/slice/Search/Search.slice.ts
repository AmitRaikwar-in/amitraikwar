import { AppStoreSlice } from '../../appStore/types';
import { SearchState, SearchStateSlice } from './types';

const initialSearchState: SearchState = {
  searchText: '',
};

const createModalSlice: AppStoreSlice<SearchStateSlice> = (set) => ({
  ...initialSearchState,
  setSearchText: (searchText: string) => {
    set((state) => {
      state.Search.searchText = searchText;
    });
  },
  resetSearchText: () => {
    set((state) => {
      state.Search.searchText = initialSearchState.searchText;
    });
  },
});

export default createModalSlice;
