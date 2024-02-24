import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewProductDetail = () => {
    const id = useParams().id;
    const productInfo = {
        Name: "",
        Price: "",
        Description: "",
        Category: "",
        Images: [],
        Comments: []
    }
    const commentInfo = {
        author: "",
        text: "",
        rate: "",
    }
    const [data, setData] = useState(productInfo);
    const [rate, setRate] = useState(0);

    const fetchProductDetail = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                method: 'GET',
                mode: 'cors',
            });
            const json = await response.json();
            console.log(json)
            if (response.status === 200) {
                setData({
                    Name: json.name,
                    Price: json.price,
                    Description: json.description,
                    Category: json.category.name,
                    Images: json.images,
                    Comments: json.comments
                });
            }
        } catch (error) {
            throw new Error(error.toString());
        }
    }

    const handleComment = async (event) => {
        const formData = new FormData(event.target);
        event.preventDefault();
        try {
            const dataInput = {
                author: await formData.get('author'),
                text: await formData.get('text'),
                rate: await formData.get('rate'),
            };
            const response = await fetch(`http://127.0.0.1:9999/products/comment/${id}`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataInput)
            });
            const json = await response.json();
            if (response.status === 200) {
                window.location.reload(true);
            }
        } catch (e) {
            console.log(e.toString());
        }


    }

    const calculateRate = async () => {
        try {
            const response = await fetch(`http://127.0.0.1:9999/products/comments/${id}`, {
                method: 'GET',
                mode: 'cors',
            });
            const json = await response.json();
            if (response.status === 200) {
                if (json.length > 0) {
                    const sum = json.reduce((n, { rate }) => n + rate, 0);
                    const rate = Math.round(sum / json.length);
                    console.log(sum)
                    console.log("json.length = " + json.length)
                    setRate(rate);
                }
            }
        } catch (error) {
            setRate(0);
            console.log(error.toString());
        }
    }

    useEffect(() => {
        fetchProductDetail();
        calculateRate();
        console.log(data);

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
                            <tr>
                                <th scope="row">Rate: </th>
                                <td>{rate}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <h5>Images</h5>
                <div className="container" style={{ width: "50%" }}>
                    <div className="row">
                        <table className="table table-bordered table-sm">
                            <tr>
                                <th>URL</th>
                                <th>CAPTION</th>
                            </tr>
                            <tbody>
                                {data.Images.length > 0 && data.Images.map(img => {
                                    return (
                                        <tr>
                                            <td>{img.url}</td>
                                            <td>{img.caption}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

                <h5>Comment</h5>
                <div className="container" style={{ width: "50%" }}>
                    <div className="row">
                        <table className="table table-bordered table-sm">
                            <tr>
                                <th>Author</th>
                                <th>Comment</th>
                            </tr>
                            <tbody>
                                {data.Comments.length > 0 && data.Comments.map(cmt => {
                                    return (
                                        <tr>
                                            <td>{cmt.author}</td>
                                            <td>{cmt.text}</td>
                                        </tr>)
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div style={{ margin: "5% 0" }}>
                        <form onSubmit={handleComment} id="imageForm">
                            <div className="form-group row">
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Email</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" name="author" placeholder="Author" />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Text</label>
                                <div className="col-sm-5">
                                    <input type="text" className="form-control" name="text" placeholder="Text" />
                                </div>
                                <label htmlFor="staticEmail" className="col-sm-5 col-form-label">Rate</label>
                                <div className="col-sm-5">
                                    <input type="number" min={1} max={5} className="form-control" name="rate" placeholder="Rate" />
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
                {/* button section */}
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