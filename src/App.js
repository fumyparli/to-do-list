import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

// react-virtualized 사용하면 보이지않는 것들은 렌더링을 안하고 보여질때 함으로써 최적화 가능
// immer 사용해서 복사 쉽게 할 수 있음(불변성유지)
function createBulkTodos() {
    const array = [];
    for (let i = 0; i < 2500; i++) {
        array.push({
            id: i,
            text: `to do${i}`,
            checked: false,
        });
    }
    return array;
}

const App = () => {
    const [todos, setTodos] = useState(createBulkTodos);

    const nextId = useRef(2501);

    const onInsert = useCallback((text) => {
        const todo = { id: nextId.current, text, checked: false };
        setTodos((todos) => todos.concat(todo));
        nextId.current += 1;
    }, []);

    const onRemove = useCallback((id) => {
        setTodos((todos) => todos.filter((todo) => todo.id !== id));
    }, []);

    const onToggle = useCallback((id) => {
        setTodos((todos) =>
            todos.map((todo) =>
                todo.id === id ? { ...todo, checked: !todo.checked } : todo
            )
        );
    }, []);

    return (
        <TodoTemplate>
            <TodoInsert onInsert={onInsert} />
            <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
        </TodoTemplate>
    );
};

export default App;
