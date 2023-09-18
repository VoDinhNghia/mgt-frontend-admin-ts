import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { routes } from "./constants/constant";
import store from "./store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/dashboard";
import ProtectedRoutes from "./utils/protected-route.util";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path={routes.login} element={<LoginPage />} />
          <Route path="/" element={<LoginPage />} />
          <Route
            path={routes.dashboard}
            element={
              <ProtectedRoutes>
                <DashboardPage />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
