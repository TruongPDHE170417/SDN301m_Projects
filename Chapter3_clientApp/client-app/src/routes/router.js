import {
    createBrowserRouter,
} from "react-router-dom";
import ViewListProduct from "../pages/ViewListProduct";
import ViewProductDetail from "../pages/ViewProductDetail";
import EditMode from "../pages/EditMode";
import ProductForm from "../components/ProductForm";
import CreateMode from "../pages/CreateMode";
const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ViewListProduct />
        )
    },
    {
        path: "/test",
        element: (
            <ProductForm />
        )
    },
    {
        path: "/product/:id",
        element: (
            <ViewProductDetail />
        )
    },
    {
        path: "/product/edit/:id",
        element: (
            <EditMode />
        )
    },
    {
        path: "/product/create",
        element: (
            <CreateMode />
        )
    }
]);
export default router;