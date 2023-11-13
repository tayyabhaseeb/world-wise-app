import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function loginAction(user) {
  return {
    type: "LOG_IN",
    payload: user,
  };
}

function logoutAction() {
  return {
    type: "LOG_OUT",
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, isAuthenticated: true, user: action.payload };

    case "LOG_OUT":
      return { ...state, isAuthenticated: false, user: null };

    default:
      throw new Error("This State is not found ");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};
function AuthProvider({ children }) {
  const FAKE_USER = {
    name: "Jack",
    email: "jack@example.com",
    password: "qwerty",
    avatar: "https://i.pravatar.cc/100?u=zz",
  };
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch(loginAction(FAKE_USER));
    }
  }
  function logout() {
    dispatch(logoutAction());
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContextValue() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context d'not wrap this component");
  return context;
}

export { useAuthContextValue, AuthProvider };
