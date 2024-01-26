import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Row from "./Row";

const CusTable = () => {
    const [data, setData] = useState([]);
    const fetchData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:9999/products/', {
                method: 'GET',
                mode: 'cors',
            });
            const result = await response.json();
            if (result.statusCode === 200) {
                console.log(result.data);
                setData(result.data);
            } else {
                setData([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <table className="table" >
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Detail</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    data.length > 0 ? data.map(v => {
                        return (
                            <Row key={v._id} id={v._id} name={v.name} price={v.price} />
                        )
                    }) : 'no info'
                }
            </tbody>
        </table>
    )
}
export default CusTable;