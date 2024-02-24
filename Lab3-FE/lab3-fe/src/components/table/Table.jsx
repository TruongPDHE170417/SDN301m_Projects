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
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            const result = await response.json();
            if (response.ok) {
                console.log(result);
                setData(result);
            } else {
                setData([]);
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [data]);

    return (
        <>
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
                        data.length > 0 && data.map(v => {
                            return (
                                <Row key={v._id} id={v._id} name={v.name} price={v.price} binding={data} />
                            )
                        })
                    }
                </tbody>
            </table>
            {
                data.length === 0 && (
                    <h3>No content</h3>
                )
            }
        </>
    )
}
export default CusTable;