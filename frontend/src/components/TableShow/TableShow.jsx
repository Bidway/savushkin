import React, { useContext, useState } from 'react'
import "./TableShow.css";
import Context from '../../context/Context';
const TableShow = () => {
    const { roles, setRoles, options, setOption } = useContext(Context);
    const handleClick = (value) => {
        const updatedArr = roles.filter((item) => {
            return item.role !== value;
        })
        setRoles(updatedArr);
        setOption([
            ...options,
            { option: value }
        ])
    }
    return (
        <>
            <table>
                <thead>
                    <th><h2>Role</h2></th>
                </thead>
                <tbody>
                    {roles.map((role, index) => {
                        return (
                            <tr key={index}>
                                <td>{role.role} <button onClick={() => handleClick(role.role)}>Delete</button></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </>
    )
}

export default TableShow