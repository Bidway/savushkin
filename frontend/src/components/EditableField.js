import React, { useState, useEffect } from 'react';

const EditableField = ({ value, onSave, ...props }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [inputValue, setInputValue] = useState(value);

    useEffect(() => setInputValue(value), [value]);

    const handleSave = () => {
        onSave(inputValue);
        setIsEditing(false);
    };

    return isEditing ? (
        <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onBlur={handleSave}
            onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            autoFocus
            {...props}
        />
    ) : (
        <span onClick={() => setIsEditing(true)} {...props}>
            {value}
        </span>
    );
};

export default EditableField;