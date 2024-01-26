import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductForm = ({ mode, id }) => {
    const [message, setMessage] = useState();
    const [action, setAction] = useState();
    const productInfoInit = {
        name: "",
        price: "",
        description: "",
        category: "",
    }
    const [productInfo, setProductInfo] = useState(productInfoInit);

    const handleCreate = async () => {
        try {
            const response = await fetch('http://127.0.0.1:9999/products/', {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productInfo)
            });
            const data = await response.json();
            if (response.status === 201) {
                setMessage("Created successfully");
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage(error.toString());
        }
    }

    const handleUpdate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(productInfo)
            });
            if (response.status === 200) {
                setMessage("Update successfully");
            } else {
                setMessage("Update failed");
            }
        } catch (error) {
            setMessage(error.toString());
        }
    }

    const handleProcess = async (event) => {
        const formData = new FormData(event.target);
        event.preventDefault();
        const dataInput = {
            name: await formData.get("name"),
            price: await formData.get("price"),
            description: await formData.get("description"),
            category: await formData.get("category"),
        };
        setProductInfo(dataInput);
        setAction(true);
    }

    useEffect(() => {
        const fetchProductDetail = async () => {
            if (mode === "Update") {
                try {
                    const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                        method: 'GET',
                        mode: 'cors',
                    });
                    const json = await response.json();
                    if (response.status === 200) {
                        setProductInfo({
                            name: json.name,
                            price: json.price,
                            description: json.description,
                            category: json.category,
                        });
                    }
                } catch (error) {
                    throw new Error(error.toString());
                }
            }
        }
        fetchProductDetail();
    }
        , []);

    useEffect(() => {
        if (Object.values(productInfo).some(value => value !== "") && action === true) {
            if (mode === "Create") {
                handleCreate();
            } else if (mode === "Update") {
                handleUpdate();
            }
        }
        setAction(false)
    }, [action]);

    return (
        <div className="container" style={{ textAlign: "left", width: "50%" }}>
            <div className="row">
                <form method="put" onSubmit={handleProcess}>
                    <div className="form-group" style={{ marginBottom: "1%" }}>
                        <label htmlFor="name">Product Name</label>
                        <input name="name" className="form-control" placeholder="Product Name" defaultValue={productInfo.name ? productInfo.name : ""} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "1%" }}>
                        <label htmlFor="price">Product Price</label>
                        <input type="number" name="price" className="form-control" placeholder="Product Price" defaultValue={productInfo.price ? productInfo.price : ""} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "1%" }}>
                        <label htmlFor="description">Product Description</label>
                        <input name="description" className="form-control" placeholder="Product Description" defaultValue={productInfo.description ? productInfo.description : ""} required />
                    </div>
                    <div className="form-group" style={{ marginBottom: "1%" }}>
                        <label htmlFor="category">Product Category</label>
                        <input name="category" className="form-control" placeholder="Product Category" defaultValue={productInfo.category ? productInfo.category : ""} required />
                    </div>
                    <div style={{ margin: "5% 0" }} >
                        {
                            message && (
                                <div className="alert alert-danger" role="alert">
                                    {message}
                                </div>
                            )
                        }
                    </div>
                    <div className="row">
                        <div className="col">
                            <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>{id ? "Update" : "Create"}</button>
                        </div>
                        <div className="col">
                            <Link to={'/'}>
                                <button className="btn btn-dark" style={{ width: "100%" }}>Back</button>
                            </Link>
                        </div>
                    </div>

                </form>
            </div>
            <div className="row" style={{ marginTop: "1%" }}>
            </div>
        </div>
    )

}
export default ProductForm;