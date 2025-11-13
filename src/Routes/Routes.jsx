import { Routes, Route } from "react-router-dom";
import IndexPage from "../pages/Index/IndexPage";
import ProductsPage from "../pages/Products/ProductsPage";
import NotFound from "../pages/Error/NotFound";
import LoginPage from '../pages/Auth/LoginPage';
import SignupPage from '../pages/Auth/SignupPage';
import ClientDashboard from "../pages/Client/ClientDashboard";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Logs from "../components/Admin/logs";

export default function RoutesList() {



    return (
        <Routes>

            <Route path="/" element={<IndexPage />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/client" element={<ProtectedRoute><ClientDashboard /></ProtectedRoute>} />
           

            {/* Admin Routes */}
            <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            
            {/* Error Routes */}
            <Route path={'*'} element={<NotFound />} />
        </Routes>
    )
}