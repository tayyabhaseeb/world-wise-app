import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import CountryList from "./components/CountryList";
import Form from "./components/Form";
import City from "./components/City";
import CityList from "./components/CityList";
import { CitiesProvider } from "./Contexts/CitiesContext";
import { AuthProvider } from "./Contexts/FakeAuthContext";
import PrivateRoute from "./components/PrivateRoute";
import SpinnerFullPage from "./components/SpinnerFullPage";

// import Homepage from "./pages/Homepage";
// import Pricing from "./pages/Pricing";
// import PageNotFound from "./pages/PageNotFound";

// import Product from "./pages/Product";
// import Login from "./pages/Login";
// import AppLayout from "./pages/AppLayout";
import { Suspense, lazy } from "react";

const Homepage = lazy(() => import("./pages/Homepage"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PageNotFound = lazy(() => import("./pages/PageNotFound"));
const Product = lazy(() => import("./pages/Product"));
const Login = lazy(() => import("./pages/Login"));
const AppLayout = lazy(() => import("./pages/AppLayout"));

function App() {
  return (
    <div>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/product" element={<Product />} />
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/app" element={<AppLayout />}>
                    <Route index element={<Navigate to="cities" replace />} />
                    <Route path="cities" element={<CityList />} />

                    <Route path="cities/:id" element={<City />} />
                    <Route path="countries" element={<CountryList />} />
                    <Route path="form" element={<Form />} />
                  </Route>
                </Route>

                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
