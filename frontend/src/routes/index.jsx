import Dashboard from "layouts/Dashboard/Dashboard.jsx";
import LoginPage from 'layouts/LoginPage/LoginPage';
import RegisterPage from 'layouts/Register/RegisterPage';

const indexRoutes = [{ path: "/", component: LoginPage}, { path: "/register", component: RegisterPage}, { redirect: true, path: "/", to: "/", navbarName: "Redirect" }];

export default indexRoutes;