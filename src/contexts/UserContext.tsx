import { createContext, useContext, useState } from "react";
import type { Employee } from "../api/internalTypes";

interface UserContextType {
    user: Employee | null;
    setUser: (user: Employee | null) => void;
    token: string | null;
    setToken: (token: string | null) => void;
}

const UserContext = createContext<UserContextType>({
    user: null,
    setUser: () => {},
    token: null,
    setToken: () => {}
});

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<Employee | null>(null);
    const [token, setToken] = useState<string | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser, token, setToken }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
  return useContext(UserContext);
}