import React from 'react';
import { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/globals.css';

const queryClient = new QueryClient(); // Create a QueryClient instance

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      {/* ...existing code... */}
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
