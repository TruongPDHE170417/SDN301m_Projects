import React, { useState } from "react";
import { Link } from "react-router-dom";

const Row = ({ id, name, price, binding }) => {
    const [isDelete, setIsDelete] = useState(false);
    const handleDelete = async () => {
        let confirmOption = window.confirm("Are you sure want to delete this product");
        if (confirmOption) {
            try {
                const response = await fetch(`http://127.0.0.1:9999/products/${id}`, {
                    method: 'DELETE',
                    mode: 'cors',
                });
                if (response.status !== 200) {
                    throw new Error("Can not delete properly");
                }
                setIsDelete(true);
            } catch (e) {
                alert(e.toString());
            }
        }

    }
    if (isDelete) {
        const targetWithIndex = binding.findIndex((target) => {
            return target.id === id;
        })
        if (targetWithIndex > -1) {
            binding.splice(targetWithIndex, 1);
        }
        return null
    }
    return (
        <tr>
            <td>{id}</td>
            <td>{name}</td>
            <td>{price}</td>
            <td>
                <Link to={`product/${id}`}>
                    <button className="btn btn-success">
                        Details
                    </button>
                </Link>
            </td>
            <td>
                <button className="btn btn-danger" onClick={handleDelete}>
                    Delete
                </button>
            </td>
        </tr>
    )
}
export default Row;