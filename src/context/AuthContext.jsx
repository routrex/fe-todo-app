import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = (props) => {
  const { children } = props;
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });


  useEffect(() => {
    if (user) {
     localStorage.setItem("user", JSON.stringify(user))
    }
  }, [user]);

  return (
     <AuthContext.Provider value={{ user, setUser}}>
      {children}
    </AuthContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);   
