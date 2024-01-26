import React from "react";
import { useParams } from "react-router-dom";
import ProductForm from "../components/ProductForm";

const EditMode = () => {
    const { id } = useParams();
    return (
        <>
            <h2>Update Product info</h2>
            <ProductForm mode={"Update"} id={id} />
        </>

    )
}
export default EditMode