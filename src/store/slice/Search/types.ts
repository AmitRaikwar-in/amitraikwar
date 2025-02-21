export type SearchState = {
  searchText?: string;
};

export interface SearchStateAction {
  setSearchText: (searchText: string) => void;
  resetSearchText: () => void;
}

export type SearchStateSlice = SearchState & SearchStateAction;
