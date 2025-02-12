import React from 'react';
import {
  AppRouterProvider,
  LocalizationProvider,
  ThemeProvider,
} from '@providers';
import { HelmetProvider } from 'react-helmet-async';
import { CursorProvider, Noise } from '@components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 5,
      retryDelay: 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <React.StrictMode>
          <HelmetProvider>
            <CursorProvider>
              <LocalizationProvider>
                <Noise />
                <AppRouterProvider />
              </LocalizationProvider>
            </CursorProvider>
          </HelmetProvider>
        </React.StrictMode>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
