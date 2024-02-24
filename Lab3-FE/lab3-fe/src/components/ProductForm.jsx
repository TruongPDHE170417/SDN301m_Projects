import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategorySelect from "./CategorySelect";

const ProductForm = ({ mode, id }) => {
    //object
    const productInfoInit = {
        name: "",
        price: "",
        description: "",
        comments: [],
        images: [],
        category: ""

    }

    //state
    const [message, setMessage] = useState();
    const [action, setAction] = useState();
    const [imageList, setImageList] = useState([]);
    const [productInfo, setProductInfo] = useState(productInfoInit);

    //function
    const getCategory = () => {
        const element = document.getElementById('category');
        const option = element.options[element.selectedIndex];
        const id = option.getAttribute('id');
        return id;
    }

    const deleteImage = (index) => {
        const target = imageList[index];
        console.log(index)
        console.log(target);
        setImageList(l => l.filter(img => { return img.name !== target.name }));
    }

    //handler
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
        const category = getCategory();
        const formData = new FormData(event.target);
        event.preventDefault();
        const dataInput = {
            name: await formData.get("name"),
            price: await formData.get("price"),
            description: await formData.get("description"),
            comments: [],
            images: imageList,
            category: category
        };
        setProductInfo(dataInput);
        console.log(dataInput);
        setAction(true);
    }

    const handleImage = async (event) => {
        const formData = new FormData(event.target);
        document.getElementById("imageForm").reset();
        event.preventDefault();
        const newImg = {
            url: await formData.get("Iurl"),
            caption: await formData.get("Icaption"),
            name: await formData.get("Iname")
        };
        setImageList(prev => [...prev, newImg]);
    }


    //effect
    useEffect(() => {
        const fetchProductDetail = async () => {
            if (mode === "Update") {
                try {
                    const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                        method: 'GET',
                        mode: 'cors',
                    });
                    const json = await response.json();
                    if (response.ok) {
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
                <form method="post" onSubmit={handleProcess}>
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
                        <CategorySelect id={id} default={mode === "Update" && productInfo.category._id} />
                    </div>
                    {/* button section */}
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
                {!id &&
                    <>
                        <h3>Add immages to this product [optional]</h3>
                        <form onSubmit={handleImage} id="imageForm">
                            <div className="form-group" style={{ marginBottom: "1%" }}>
                                <label htmlFor="image">Images</label>
                                <div style={{ marginBottom: "1%", marginLeft: "5%" }}>
                                    <div style={{ marginBottom: "1%" }}>
                                        <label>URL</label>
                                        <input name="Iurl" className="form-control" placeholder="url" />
                                    </div>
                                    <div style={{ marginBottom: "1%" }}>
                                        <label>Caption</label>
                                        <input name="Icaption" className="form-control" placeholder="caption" />
                                    </div>
                                    <div style={{ marginBottom: "1%" }}>
                                        <label>Name</label>
                                        <input name="Iname" className="form-control" placeholder="name" />
                                    </div>
                                    <div style={{ marginBottom: "1%" }}>
                                        <button className="btn btn-primary" type="submit">Add</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <label>Added images</label>
                        <ul>
                            {
                                imageList.length > 0 && imageList.map((img, index) => {
                                    return (
                                        <li key={index}>
                                            <span>{img.name}</span>
                                            <button className="btn" onClick={() => deleteImage(index)}>Delete</button>
                                        </li>)
                                })
                            }
                        </ul>
                    </>}
            </div>
        </div>
    )
}
export default ProductForm;