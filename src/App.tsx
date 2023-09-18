/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { NotificationContainer } from "react-notifications";
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/login";
import { routes } from "./constants/constant";
import store from "./store";
import { Provider } from "react-redux";
import DashboardPage from "./pages/dashboard";
import ProtectedRoutes from "./utils/protected-route.util";
import NotfoundPage from "./pages/notfound";
import UserManagementPage from "./pages/management-users";

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
          <Route
            path={routes.userMgt}
            element={
              <ProtectedRoutes>
                <UserManagementPage />
              </ProtectedRoutes>
            }
          />
          <Route path="*" element={<NotfoundPage />} />
        </Routes>
        <NotificationContainer />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
