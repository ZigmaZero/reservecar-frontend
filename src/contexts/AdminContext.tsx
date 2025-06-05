import { createContext, useContext, useState } from "react";
import type { Admin } from "../api/types";

interface AdminContextType {
    admin: Admin | null;
    setAdmin: (admin: Admin | null) => void;
}

const AdminContext = createContext<AdminContextType>({
    admin: null,
    setAdmin: () => {}
});

export const AdminProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
    const [admin, setAdmin] = useState<Admin | null>(null);
    return (
        <AdminContext.Provider value={{ admin, setAdmin }}>
            {children}
        </AdminContext.Provider>
    )
}

export function useAdmin() {
  return useContext(AdminContext);
}