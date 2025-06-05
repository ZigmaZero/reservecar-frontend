import { createContext, useContext, useState } from "react";
import type { Employee } from "../api/types";

interface UserContextType {
    user: Employee;
    setUser: React.Dispatch<React.SetStateAction<Employee>>;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState({
        userId: 0,
        lineId: "",
        name: "",
        verified: false
    } as Employee);
    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
  return useContext(UserContext);
}