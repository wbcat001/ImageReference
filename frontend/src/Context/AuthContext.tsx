import React, { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from "react";

// ユーザー情報の型定義
interface User {
  id: number;
  userName: string;
  email: string;
}

// AuthContext の型定義
interface AuthContextType {
  currentUser: User | null;
  updateUser: (data: User | null) => void;
  getUser: () => void;
}

// コンテキストの初期値
export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  updateUser: () => {},
  getUser: () => {},
});

// Provider コンポーネントのプロパティ型
interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(
    JSON.parse(localStorage.getItem("user") as string) || null
  );

  const updateUser = (data: User | null) => {
    setCurrentUser(data);
  };

  const getUser = () => {
    console.log("currentUser:", currentUser);
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser,updateUser, getUser }}>
      {children}
    </AuthContext.Provider>
  );
};