import {useState} from "react";

const CreateTodo = ({setTodos}) => {
    const [title, setTitle] = useState('')
    const [date, setDate] = useState('')

    const handleAddTodo = () => {
        const currentDate = new Date();
        const newTodo = {
            id: currentDate.getTime(),
            title,
            date: currentDate.toLocaleString(),
            isCompleted: false
        };

        setTodos(prev => [newTodo, ...prev]);
        setTitle('');
        setDate(newTodo.date);
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
