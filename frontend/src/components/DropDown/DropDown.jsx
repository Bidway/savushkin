import React, { useContext, useEffect, useState } from 'react'
import Context from '../../context/Context'
import './DropDown.css';

const DropDown = () => {
    const { options, setOption, roles, setRoles } = useContext(Context);
    // const setInitialValue = () => {
    //     const roleValue = "select option";
    //     return roleValue;
    // }
    const [roleValue, setRoleValue] = useState('');
    const [oneValue, setOneValue] = useState('');
    const handleChange = (event) => {
        setRoleValue(event.target.value)
    }
    useEffect(() => {
        console.log('Role value changed:', roleValue);
        setOneValue(roleValue)
    }, [roleValue]);
    const handleAddOption = () => {
        const presence = options.filter((option) => {
            return option.option !== oneValue;
        })
        setOption(presence)
        if (roleValue !== " ") {
            const newRole = { role: oneValue };
            setRoles([...roles, newRole]);
        }
    }
    return (
        <>
            <div>
                <select onChange={handleChange} value={roleValue}>
                    <option>select options</option>
                    {options.map((option, index) => {
                        return (
                            <option value={option.option} key={index}>{option.option}</option>
                        )
                    })}
                </select>
                <button onClick={handleAddOption} className='action-btn' >Add</button>
            </div>
        </>
    )
}

export default DropDown