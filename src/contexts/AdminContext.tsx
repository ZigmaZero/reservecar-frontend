import { createContext, useContext, useState } from "react";
import type { Admin } from "../api/types";

interface AdminContextType {
    user: Admin;
    setUser: React.Dispatch<React.SetStateAction<Admin>>;
}

const AdminContext = createContext<AdminContextType | null>(null);

export const AdminProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [user, setUser] = useState({
        adminId: 0,
        name: ""
    } as Admin);
    return (
        <AdminContext.Provider value={{ user, setUser }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
  return useContext(AdminContext);
}