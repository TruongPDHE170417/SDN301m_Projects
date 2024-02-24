import React, { useEffect, useState } from 'react'
const API_CATEGORY = "http://127.0.0.1:9999/categories"
const CategorySelect = (props) => {
    const categoryInit = {
        name: "",
        description: ""
    }
    const [categoryList, setCategoryList] = useState([categoryInit])

    const getCatgegoryData = async () => {
        try {
            const response = await fetch(API_CATEGORY, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-Type': "application/json"
                }
            });
            const data = await response.json();
            setCategoryList(data || []);
        } catch (e) {
            throw new Error(e.toString());
        }
    }


    useEffect(() => {
        getCatgegoryData();
    }, [])

    return (
        // <select name="category" className="form-control" required={true}>
        <select className='form-control' name='category' id='category' required>
            {
                categoryList?.map(category => {
                    return (
                        <option key={category._id} id={category._id} selected={category._id === props.defaultValue}>{category.name}</option>
                    )
                })
            }
        </select>
    )
}
export default CategorySelect;