import {BsCheck} from "react-icons/bs";
import cn from 'classnames'



const CheckBox = ({isCompleted,changeTodo,id}) => {
    return (
        <div onClick={() => changeTodo(id)} className={cn('mt-2 lg: border-2 rounded-lg border-pink-400 w-6 h-6 mr-3 flex items-center justify-center',{
            'bg-pink-400':isCompleted
        })}>
            {isCompleted &&
                <BsCheck size={24} className='text-gray-900' />
            }
        </div>


    );
};

export {CheckBox};
