import React, { useState } from 'react'
import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import { Context, useGlobalContext } from '../../context/LoginContext'

const UserTableHead = ({ headers, onSorting, id }) => {
    const {sortingOrder,setSortingOrder, sessionUser,} = useGlobalContext(Context);
    const [sortingField, setSortingField] = useState("");

    const onSortingChange = (field) => {
        const order =
            field === sortingField && sortingOrder === "asc" ? "desc" : "asc";
        setSortingField(field);
        setSortingOrder(order);
        localStorage.setItem("order", order);
        onSorting(field, order);
    };
    return (
            <thead className="text-center w-100">
            <tr>
                {headers.map(({ name, field, sortable }, index) => (
                    <th
                        key={index}
                        onClick={() =>
                            sortable ? onSortingChange(field) : null
                        }
                    >
                        {name}
                        {sortable &&
                            (localStorage.getItem("order") === "desc" ? (
                                <BsArrowUp />
                            ) : (
                                <BsArrowDown />
                            ))}
                    </th>
                ))}
                {sessionUser.id == id && <th>Action</th>}
            </tr>
        </thead>
    )
}

export default UserTableHead
