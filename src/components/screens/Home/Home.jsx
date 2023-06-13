import {TodoItem} from "./item/TodoItem";
import {useState} from "react";
import {CreateTodo} from "./create-todo-field/CreateTodo";


const data = [

]
const Home = () => {
    const [todos,setTodos] = useState(data)

    const handleChangeTodo = (id) => {
        const copy = [...todos]
        const current = copy.find(t=>t.id === id)
        current.isCompleted = !current.isCompleted
        setTodos(copy)
    }

    const handleRemoveTodo = id => setTodos([...todos].filter(t => t.id !== id))








    return (
        <div className=' text-white w-4/5 mx-auto'>
            <h1 className='text-2xl font-bold text-center mb-10'>Todo</h1>
            {todos.map(item =>
                <TodoItem
                    key={item.id}
                    todo={item}
                    changeTodo={handleChangeTodo}
                    removeTodo={handleRemoveTodo}
                />)
            }
            <CreateTodo setTodos={setTodos}/>
        </div>
    );
};

export {Home};
