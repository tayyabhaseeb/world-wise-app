import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function addLogin(value) {
  return {
    type: "LOG_IN",
    payload: value,
  };
}

function addLogout() {
  return {
    type: "LOG_IN",
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "LOG_IN":
      return { ...state, user: action.payload, isAuthenticated: true };
    case "LOG_OUT":
      return { ...state, user: null, isAuthenticated: false };

    default:
      throw new Error("State not found");
  }
}

const initialState = {
  user: null,
  isAuthenticated: false,
};

const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    if (email === FAKE_USER.email && password === FAKE_USER.password) {
      dispatch(addLogin(FAKE_USER));
    }
  }

  function logout() {
    dispatch(addLogout());
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContextValue() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("Auth Context  Provider did not wrap this component");
  return context;
}

export { AuthProvider, useAuthContextValue };

////////////////////////////////////

const navigate = useNavigate();

const { login, isAuthenticated } = useAuthContextValue();

function handleSubmit(e) {
  e.preventDefault();
  if (email && password) {
    login(email, password);
  }
}

useEffect(() => {
  if (isAuthenticated) {
    navigate("/app", { replace: true });
  }
}, [isAuthenticated, navigate]);
