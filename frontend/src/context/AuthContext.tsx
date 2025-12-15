import { createContext, useContext, useEffect, useState } from "react";

// Defino como es mi usuario
interface Usuario {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    tipo: "alumno" | "mentor" | "admin";

    // Campos opcionales segun mi rol
    fechaNacimiento?: Date;          // Si soy alumno
    tituloProfesional?: string;      // Si soy mentor
    experiencia?: string;            // Si soy mentor
    fechaDeIngreso?: string;         // Si soy mentor
    estaDisponible?: boolean;        // Si soy mentor
}

// Lo que puedo hacer con mi contexto
interface AuthContextType {
    usuario: Usuario | null;
    login: (data: { token: string; usuario: Usuario }) => void;
    logout: () => void;
    setUsuario: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

// Creo mi contexto que empieza vacío
const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [usuario, setUsuario] = useState<Usuario | null>(null);

    // Al iniciar reviso si ya tengo sesión guardada
    useEffect(() => {
        const user = localStorage.getItem("usuario");
        if (user) {
            setUsuario(JSON.parse(user));
        }
    }, []);

    // Cuando inicio sesin guardo mis datos y token
    const login = ({ token, usuario }: { token: string; usuario: Usuario }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("usuario", JSON.stringify(usuario));
        setUsuario(usuario);
    };

    // Cuando cierro sesion, limpio todo
    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("usuario");
        setUsuario(null);
    };

    // Le paso a mis hijos todo lo que necesitan del contexto
    return (
        <AuthContext.Provider value={{ usuario, login, logout, setUsuario }}>
            {children}
        </AuthContext.Provider>
    );
}

// Este hook me permite usar mi contexto fácilmente
export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) {
        throw new Error("useAuth debo usarlo dentro de AuthProvider");
    }
    return ctx;
};
