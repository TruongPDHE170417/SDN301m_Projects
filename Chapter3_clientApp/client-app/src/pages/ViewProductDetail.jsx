import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewProductDetail = () => {
    const { id } = useParams();
    const productInfo = {
        Name: "",
        Price: "",
        Description: "",
        Category: "",
    }
    const [data, setData] = useState(productInfo);

    const fetchProductDetail = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                method: 'GET',
                mode: 'cors',
            });
            const json = await response.json();
            if (response.status === 200) {
                setData({
                    Name: json.name,
                    Price: json.price,
                    Description: json.description,
                    Category: json.category,
                });
            }
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    useEffect(() => {
        fetchProductDetail();
    }, []);

    return (
        <>
            <h2>Detail</h2>
            <div className="container" style={{ width: "50%" }}>
                <div className="row">
                    <table className="table table-bordered table-sm">
                        <tbody>
                            <tr>
                                <th scope="row" style={{ width: "20%" }}>Name: </th>
                                <td>{data.Name}</td>
                            </tr>
                            <tr>
                                <th scope="row">Price: </th>
                                <td>{data.Price}</td>
                            </tr>
                            <tr>
                                <th scope="row">Description: </th>
                                <td>{data.Description}</td>
                            </tr>
                            <tr>
                                <th scope="row">Category: </th>
                                <td>{data.Category}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="row container">
                    <div className="row col-6">
                        <Link to={`/product/edit/${id}`} >
                            <button className="btn btn-primary" style={{ width: "100%" }}>Edit</button>
                        </Link>
                    </div>
                    <div className="row col-6">
                        <Link to={"/"} >
                            <button className="btn btn-dark" style={{ width: "100%" }}>Back</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ViewProductDetail