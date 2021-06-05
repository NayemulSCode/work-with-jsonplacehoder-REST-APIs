import React, { useEffect, useMemo, useState } from 'react'
import { Context, useGlobalContext } from '../../context/LoginContext'
import PagePerItems from './PagePerItems';
import Pagination from './Pagination';
import Search from './Search';
import UserTableHead from './UserTableHead';

const Users = () => {
    const {users,
        setSorting,
        currentPage,
        setCurrentPage,
        sorting,
        search,
        itemPerPage,
        setItemPerPage,
        setSearch,
        } = useGlobalContext(Context);
    const [totalItems, setTotalItems] = useState(0);

    const headers = [
        { name: "No#", field: "id", sortable: false },
        { name: "Name", field: "name", sortable: true },
        { name: "Email", field: "email", sortable: true },
        { name: "Website", field: "website", sortable: false },
    ];
    useEffect(() => {
        setCurrentPage(
            localStorage.getItem("currentPage")
                ? parseInt(localStorage.getItem("currentPage"))
                : 1
        );
    }, []);
    const commentsData = useMemo(() => {
        let computedUsers = users;
        setTotalItems(users.length);

        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            let sortedData = [];
            sortedData = computedUsers.sort((a, b) =>
                typeof a[sorting.field] === "string"
                    ? reversed *
                      a[sorting.field].localeCompare(b[sorting.field])
                    : reversed * (a[sorting.field] - b[sorting.field])
            );
            localStorage.setItem("sortedItem", JSON.stringify(sortedData));
            console.log("sorting");
        }

        if (localStorage.getItem("sortedItem"))
            computedUsers = JSON.parse(localStorage.getItem("sortedItem"));

        if (search) {
            computedUsers = computedUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(search.toLowerCase()) ||
                    user.email
                        .toLowerCase()
                        .includes(search.toLowerCase()) ||
                    user.website.toLowerCase().includes(search.toLowerCase())
            );
            setTotalItems(computedUsers.length);
        }
        return computedUsers.slice(
            (currentPage - 1) * itemPerPage,
            (currentPage - 1) * itemPerPage + itemPerPage
        );
    }, [users, currentPage, itemPerPage, search, sorting]);
    
    return (
        <div>
            <div className=" container py-3">
                <div className="row">
                    <div className="col-md-6">
                        <Pagination
                            total={totalItems}
                            itemsPerPage={itemPerPage}
                            currentPage={currentPage}
                            onPageChange={(page) => {
                                localStorage.setItem("currentPage", page);
                                setCurrentPage(page);
                            }}
                        />
                    </div>
                    <div className="col-md-2">
                        <PagePerItems
                            onItemChange={(value) => {
                                setItemPerPage(parseInt(value));
                                setCurrentPage(1)
                                localStorage.setItem('currentPage', "1")
                            }}
                            totalItems = {totalItems}
                        />
                    </div>
                    <div className="d-flex col-md-4 flex-row-reverse">
                        <Search
                            onSearch={(value) => {
                                setSearch(value);
                                setCurrentPage(1);
                            }}
                        />
                    </div>
                </div>
                <div className="row">
                    <table>
                        <UserTableHead
                            headers={headers}
                            onSorting={(field, order) =>
                                setSorting({ field, order })
                            }
                        />
                        <tbody>
                            {commentsData.map((comment, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className="text-center">
                                            {comment.id}
                                        </th>
                                        <td className="text-center">
                                            {comment.name}
                                        </td>
                                        <td className="text-center">{comment.email}</td>
                                        <td className="text-center">{comment.website}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Users
