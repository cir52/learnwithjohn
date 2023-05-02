import React from 'react';
import { sanityClient } from './sanityContext';

export const SanityContext = React.createContext();

export function SanityContextProvider({ children }) {
  return (
    <SanityContext.Provider value={sanityClient}>
      {children}
    </SanityContext.Provider>
  );
}