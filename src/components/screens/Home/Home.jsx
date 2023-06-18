import React, { useEffect, useState } from 'react';

import { Checkbox, FormControlLabel } from '@mui/material';
import { Reorder, AnimatePresence } from 'framer-motion';
import { TodoItem } from './item/TodoItem';
import { CreateTodo } from './create-todo-field/CreateTodo';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState({
        High: true,
        Middle: true,
        Low: true,
    });

    useEffect(() => {
        const storedTodos = localStorage.getItem('todos');
        if (storedTodos) {
            setTodos(JSON.parse(storedTodos));
        }
    }, []);

    const handleChangeTodo = (id) => {
        const copy = [...todos];
        const current = copy.find((t) => t.id === id);
        current.isCompleted = !current.isCompleted;
        setTodos(copy);
    };

    const handleRemoveTodo = (id) => {
        const updTodos = todos.filter((i) => i.id !== id);
        localStorage.setItem('todos', JSON.stringify(updTodos));
        setTodos(updTodos);
    };

    const changePriority = (todoId, newPriority) => {
        setTodos((prevTodos) => {
            return prevTodos.map((todo) => {
                if (todo.id === todoId) {
                    return { ...todo, priority: newPriority };
                }
                return todo;
            });
        });
    };

    const handleFilterChange = (event) => {
        const { name, checked } = event.target;
        setFilter((prevFilter) => ({
            ...prevFilter,
            [name]: checked,
        }));
    };

    const clearAll = () => {
        localStorage.clear()
        setTodos([])
    }

    const filteredTodos = todos.filter((todo) => filter[todo.priority] || !todo.priority);

    return (
        <div className="text-white w-4/5 mx-auto">
            <h1 className="text-2xl font-bold text-center mb-10 text-zinc-400">Todo</h1>
            <h3 className="text-xl font-bold text-center mb-10 text-zinc-400">
                What you gonna do today?
            </h3>
            <CreateTodo todos={todos} setTodos={setTodos} />

            {todos.length>0? <div className="flex justify-center text-zinc-400 mb-5">
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{ color: '#8f9fa6' }}
                            checked={filter.High}
                            onChange={handleFilterChange}
                            name="High"
                        />
                    }
                    label="High"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{ color: '#8f9fa6' }}
                            checked={filter.Middle}
                            onChange={handleFilterChange}
                            name="Middle"
                        />
                    }
                    label="Middle"
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            style={{ color: '#8f9fa6' }}
                            checked={filter.Low}
                            onChange={handleFilterChange}
                            name="Low"
                        />
                    }
                    label="Low"
                />
            <button onClick={clearAll} className="w-20 h-10 bg-red-400 rounded-3xl">
                Clear All
            </button>
            </div> : null}


            <Reorder.Group as="div" axis="y" values={filteredTodos} onReorder={setTodos}>
                <AnimatePresence>
                    {filteredTodos.map((item) => (
                        <TodoItem
                            key={item.id}
                            todo={item}
                            changeTodo={handleChangeTodo}
                            removeTodo={handleRemoveTodo}
                            changePriority={changePriority}
                        />
                    ))}
                </AnimatePresence>
            </Reorder.Group>
        </div>
    );
};

export { Home };
