import { useEffect, useState} from "react";

const CreateTodo = ({todos,setTodos}) => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    useEffect(() => {
        const savedTodos = localStorage.getItem('todos')
        if (savedTodos){
            setTodos(JSON.parse(savedTodos))
        }
    },[setTodos])


    const handleAddTodo = () => {
        const currentDate = new Date();
        const newTodo = {
            id: currentDate.getTime(),
            title,
            date: currentDate.toLocaleString(),
            isCompleted: false,
            priority:''
        };

        setTodos(prev => [newTodo, ...prev]);
        setTitle('');
        setDate(newTodo.date);

        const savedTodos = JSON.stringify([newTodo,...todos])
        localStorage.setItem('todos', savedTodos)

    };

    return (
        <div className='flex items-center justify-between mb-4 rounded-2xl border-zinc-800 border-2 px-5 py-3 w-full mt-20'>
            <input type="text"
                   placeholder="Add a task (press Enter)"
                   onChange={event => setTitle(event.target.value)}
                   value={title}
                   onKeyPress={e => {
                       if (e.key === 'Enter' && title.trim() !== ''){
                           handleAddTodo(title)
                       }}
                                }
                   className='bg-transparent w-full border-none outline-none'


            />

        </div>

    );
};

export {CreateTodo};
