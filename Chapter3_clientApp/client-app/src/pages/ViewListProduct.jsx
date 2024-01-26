import React from "react";
import CusTable from "../components/table/Table";
import 'bootstrap/dist/css/bootstrap.css'
import { Link } from "react-router-dom";

const ViewListProduct = () => {

    return (
        <>
            <CusTable />
            <Link to={'/product/create'}>
                <button className="btn btn-primary">Create new?</button>
            </Link>
        </>
    )
}

export default ViewListProduct