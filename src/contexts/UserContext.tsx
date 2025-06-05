import { createContext, useContext, useState } from "react";
import type { Employee } from "../api/types";

interface UserContextType {
    user: Employee | null;
    setUser: (user: Employee | null) => void;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<Employee | null>(null);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
  return useContext(UserContext);
}