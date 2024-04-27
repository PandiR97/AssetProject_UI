import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userFullName, setUserFullname] = useState("");

  const setUser = (newUsername) => {
    setUserFullname(newUsername);
  };

  return (
    <UserContext.Provider value={{ userFullName, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
