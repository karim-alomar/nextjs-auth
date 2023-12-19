"use client";
import { Toaster } from "@/components";
import { store } from "@/store";
import NextTopLoader from "nextjs-toploader";
import { ReactNode, createContext } from "react";
import { Provider } from "react-redux";
const AppContext = createContext({});
interface ProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<ProviderProps> = ({ children }) => {
  const value = {};
  return (
    <AppContext.Provider value={value}>
      <Toaster />
      <NextTopLoader color="white" showSpinner={false} />
      <Provider store={store}>{children}</Provider>
    </AppContext.Provider>
  );
};
export default AppProvider;
