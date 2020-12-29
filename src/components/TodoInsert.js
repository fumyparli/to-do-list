import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
    const [value, setValue] = useState("");

    const onChange = useCallback((e) => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        (e) => {
            console.log(e);
            onInsert(value);
            setValue("");
            e.preventDefault();
        },
        [onInsert, value]
    );

    return (
        <form className="TodoInsert" onSubmit={onSubmit}>
            <input
                placeholder="put your to do things"
                value={value}
                onChange={onChange}
            />
            <button type="submit">
                <MdAdd />
            </button>
        </form>
    );
};

export default TodoInsert;
