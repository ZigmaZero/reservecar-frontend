import { createContext, useContext, useState } from "react";
import type { Admin } from "../api/types";

interface AdminContextType {
    user: Admin | null;
    setUser: React.Dispatch<React.SetStateAction<Admin | null>>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState<Admin | null>(null);
    return (
        <AdminContext.Provider value={{ user, setUser }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
  return useContext(AdminContext);
}