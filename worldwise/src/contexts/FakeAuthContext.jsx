import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initalState = {
  user: null,
  isAuth: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function reducer(state, action) {
  switch (action.type) {
    case "Login":
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case "Logout":
      return {
        ...state,
        user: null,
        isAuth: false,
      };
    default:
      throw new Error("Error");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuth }, dispatch] = useReducer(reducer, initalState);
  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch({ type: "Login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatch({ type: "Logout" });
  }
  return (
    <AuthContext.Provider value={{ user, isAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside AuthProvider");

  return context;
}

export { AuthProvider, useAuth };
