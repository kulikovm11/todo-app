import {TodoItem} from "./item/TodoItem";
import {useEffect, useState} from "react";

import {CreateTodo} from "./create-todo-field/CreateTodo";
import {useLocalStorage} from "../../../hooks/useLocalStorage";
import {SavedToDoItem} from "./item/SavedToDoItem";



const data = [

]
const Home = () => {
    const [todos,setTodos] = useState(data)

    const [mindTodo, setMindTodo] = useLocalStorage('todos',[])

    useEffect(() => {
        setTodos(data)
    },[])


    const addToMind = (id) => {
        const newTodo = todos.find(item=>item.id === id)
        const isAlreadyAdded = mindTodo.some((item) => item.id === id);
        if (!isAlreadyAdded) {
            setMindTodo([...mindTodo, newTodo]);
            setTodos(todos.filter((item) => item.id !== id));
        }

    }

    const getBackToTop = (id) => {
        const isAlreadyAdded = mindTodo.find(item=>item.id === id)
        if (isAlreadyAdded){
            setTodos([...todos, isAlreadyAdded])
            setMindTodo(mindTodo.filter((item) => item.id !== id))
        }

    }

    const handleChangeTodo = (id) => {
        const copy = [...todos]
        const current = copy.find(t=>t.id === id)
        current.isCompleted = !current.isCompleted
        setTodos(copy)
    }

    const handleChangeTodoInMindTodo = (id) => {
        const copy = [...mindTodo];
        const current = copy.find((t) => t.id === id);
        current.isCompleted = !current.isCompleted;
        setMindTodo(copy);
    };



    const handleRemoveTodo = id => setTodos([...todos].filter(t => t.id !== id))

    const handleRemoveFromLocalStorage = (id) => {
        const storedData = localStorage.getItem('todos');
        const todos = storedData ? JSON.parse(storedData) : [];

        const updatedTodos = todos.filter(item => item.id !== id);

        localStorage.setItem('todos', JSON.stringify(updatedTodos));
        setMindTodo(updatedTodos);
    };








    return (
        <div className=' text-white w-4/5 mx-auto '>
            <h1 className='text-2xl font-bold text-center mb-10 text-zinc-400'>Todo</h1>
            <h3 className='text-xl font-bold text-center mb-10 text-zinc-400'>What you gonna do today?</h3>
            <div>
                <div className="w-20 h-20 bg-green-400"></div>
                <div className="w-20 h-20 bg-yellow-400"></div>
                <div className="w-20 h-20 bg-red-400"></div>
            </div>


            {todos.map(item =>
                <TodoItem
                    key={item.id}
                    todo={item}
                    changeTodo={handleChangeTodo}
                    removeTodo={handleRemoveTodo}
                    addToMind={addToMind}
                />)
            }
            <CreateTodo setTodos={setTodos}/>

            {mindTodo.length > 0 && (
                <div>
                    <h2 className='text-xl font-bold text-center mb-10 text-zinc-400'>Saved tasks:</h2>
                    {mindTodo.map((item) => (
                        <SavedToDoItem
                            key={item.id}
                            todo={item}
                            changeTodo={handleChangeTodoInMindTodo}
                            removeTodo={handleRemoveTodo}
                            addToMind={getBackToTop}
                            removeFromSaved={handleRemoveFromLocalStorage}
                        />
                    ))}
                </div>
            )}

        </div>
    );
};

export {Home};
