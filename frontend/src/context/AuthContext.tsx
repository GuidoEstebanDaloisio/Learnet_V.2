import { createContext, useContext, useEffect, useState } from "react";

interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    tipo: "alumno" | "mentor" | "admin";

    // Alumno
    fechaNacimiento?: Date;

    // Mentor
    tituloProfesional?: string;
    experiencia?: string;
    fechaDeIngreso?: string;
    estaDisponible?: boolean;
}

interface AuthContextType {
    usuario: Usuario | null;
    login: (data: { token: string; usuario: Usuario }) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    // 🔹 Al refrescar, recuperamos sesión
    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (user) {
            setUsuario(JSON.parse(user));
        }
    }, []);

    const login = ({ token, usuario }: { token: string; usuario: Usuario }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setUsuario(usuario);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    return (
        <AuthContext.Provider value={{ usuario, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debe usarse dentro de AuthProvider");
    }
    return ctx;
};
