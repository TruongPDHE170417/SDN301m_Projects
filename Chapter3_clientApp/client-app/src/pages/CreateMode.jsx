import React from "react";
import ProductForm from "../components/ProductForm";

const CreateMode = () => {
    return (
        <>
            <h2>Create new product</h2>
            <ProductForm mode={"Create"} />
        </>

    )

}
export default CreateMode