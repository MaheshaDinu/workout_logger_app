import { auth } from "../../services/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { ReactNode, createContext, useEffect, useState } from "react";
interface AuthContextType {
    user: User | null;
    loading: boolean;
}

const initial: AuthContextType = { user: null, loading: true };

export const AuthContext = createContext<AuthContextType>(initial);

export const AuthProvider: React.FC<{  children: ReactNode }> = ({  children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) =>{
            setUser(firebaseUser);
            setLoading(false);
        })
        return unsubscribe;
    },[]);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            { children }
        </AuthContext.Provider>
    );
}

