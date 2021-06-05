import React, { useMemo } from 'react'
import { Context, useGlobalContext } from '../../context/LoginContext';

const PagePerItems = ({ onItemChange, totalItems }) => {
    const {itemPerPage, setItemPerPage} = useGlobalContext(Context)

    const onChanging = (value) => {
        setItemPerPage(value);
        localStorage.setItem("itemPerPage", value);

        onItemChange(value ? value : 10);
    };
    const optionsForRows = useMemo(() => {
        const option = [];
        for (let i = 1; i <= totalItems; i++) {
            option.push(<option key={i}  value={i}>{i}</option>);
        }
        return option;
    }, [totalItems]);
    return (
        <div>
            <select
            className="form-select"
            defaultValue={itemPerPage}
            onChange={(e) => onChanging(e.target.value)}
            aria-label="Default select"
        >
            <option value={totalItems}>
                All
            </option>
            {optionsForRows}
        </select>
        </div>
    )
}

export default PagePerItems
