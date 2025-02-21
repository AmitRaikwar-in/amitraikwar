import { AppStoreState } from 'src/store/appStore';

export const selectSearchText = (state: AppStoreState) =>
  state.Search.searchText;

export const setSearchTextSelector = (state: AppStoreState) =>
  state.Search.setSearchText;

export const resetSearchTextSelector = (state: AppStoreState) =>
  state.Search.resetSearchText;
