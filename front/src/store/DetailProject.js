import React, { createContext, useContext } from 'react';

export const DetailProjectContext = createContext();
export const useDetailProjectValues = () => {
  const { fns, ...values } = useContext(DetailProjectContext);
  return values;
};
export const useDetailProjectFns = () => {
  const { fns } = useContext(DetailProjectContext);
  return fns;
};

const DetailProjectProvider = ({ children, value }) => (
  <DetailProjectContext.Provider value={value}>
    {children}
  </DetailProjectContext.Provider>
);

export default DetailProjectProvider;
