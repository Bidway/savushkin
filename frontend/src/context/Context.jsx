import React, { useState } from 'react'
import { createContext } from 'react';

const Context = createContext();

const Provider = ({ children }) => {

    const [options, setOption] = useState([
        { option: "Designing" },
        { option: "Development" },
        { option: "Testing" },
        { option: "Q/A" },
    ])
    const [roles, setRoles] = useState([])
    return (
        <Context.Provider value={{ roles, setRoles, options, setOption }}>
            {children}
        </Context.Provider>
    )
}

export default Context;
export { Provider };