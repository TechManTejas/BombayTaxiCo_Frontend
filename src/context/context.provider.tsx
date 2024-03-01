/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, ReactNode, useContext } from 'react';


// Create the context
const MyContext = createContext<any | undefined>(undefined);

// Create a provider component
export const MyContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [userAuthenticated, setUserAuthenticated] = useState<boolean>(!!localStorage.getItem('token'))
  const [adminAuthenticated, setAdminAuthenticated] = useState<boolean>(!!localStorage.getItem('admin-token'))
  const [openAuthModal, setOpenAuthModal] = useState<boolean>(false)

  const contextValue: any = {
    userAuthenticated,
    setUserAuthenticated,
    adminAuthenticated, 
    setAdminAuthenticated,
    openAuthModal, 
    setOpenAuthModal
  };

  return (
    <MyContext.Provider value={contextValue}>
      {children}
    </MyContext.Provider>
  );
};

// Create a custom hook to use the context
export const Context = (): any => {
    const context = useContext(MyContext);
    if (!context) {
      throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
  };