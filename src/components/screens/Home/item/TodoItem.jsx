import {CheckBox} from "./CheckBox";
import cn from "classnames";
import {BsTrash} from "react-icons/bs";






const TodoItem = ({todo, changeTodo, removeTodo}) => {
    const {id, title, date, isCompleted} = todo
    return (
        <div className='flex items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full'>
            <button
                className='flex items-center'
                onClick={() => changeTodo(id)}
            >
                <CheckBox isCompleted={isCompleted} />

                <span
                    className={cn({
                        'line-through': isCompleted,
                    })}
                >
					{title}
                    {date && <span className='ml-10 text-zinc-400'>{date}</span>}



				</span>
            </button>

            <button onClick={() => removeTodo(id)}>
                <BsTrash
                    size={22}
                    className='text-gray-600 hover:text-red-700 transition-colors ease-in-out duration-300'
                />
            </button>

        </div>
    )
};

export {TodoItem};
