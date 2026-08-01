'use client';
import React, { createContext, useContext, useState } from 'react';

const RegisterContext = createContext();

export function RegisterProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const openRegister = () => setIsOpen(true);
  const closeRegister = () => setIsOpen(false);

  return (
    <RegisterContext.Provider value={{ isOpen, openRegister, closeRegister }}>
      {children}
    </RegisterContext.Provider>
  );
}

export function useRegister() {
  return useContext(RegisterContext);
}
