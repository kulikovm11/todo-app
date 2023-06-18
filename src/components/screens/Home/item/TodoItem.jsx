import {useEffect, useState} from "react";

import {Reorder} from "framer-motion"
import {CheckBox} from "./CheckBox";
import cn from "classnames";
import {BsTrash} from "react-icons/bs";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup} from "@mui/material";







const TodoItem =  ({todo, changeTodo, removeTodo,changePriority}) => {
    const {id, title, date, isCompleted} = todo
    const [selectedValue, setSelectedValue] = useState("")


    useEffect(() => {
        const storedValue = localStorage.getItem(`selectedValue_${id}`);
        if (storedValue) {
            setSelectedValue(storedValue);
        }
    }, [id]);

    const handleRadioChange = (event) => {
        const { value } = event.target;
        setSelectedValue(value);
        changePriority(id, value);
        localStorage.setItem(`selectedValue_${id}`, value);
    };




    return (

        <Reorder.Item
            value={todo}
            whileDrag={{
                scale:1.1,
            }}
           style={{listStyle:'none'}}


        >

        <div className='box-content flex flex-col lg:flex-row items-center justify-between mb-4 rounded-2xl bg-zinc-800 p-5 w-full flex-grow flex-shrink'>

            <div className='w-4/5 lg:w-16 flex flex-col lg:flex-row items-center justify-between'>

                <div className={cn('w-4/5 lg:w-3 h-4 lg:h-16  rounded-md lg:rounded-l-xl',{
                    "bg-red-600 ": selectedValue === "High",
                    "bg-orange-400": selectedValue === "Middle",
                    "bg-green-400": selectedValue === "Low",

                })}></div>



                    <CheckBox isCompleted={isCompleted} changeTodo={changeTodo} id={id}/>
            </div>


                <div
                     id="TxtHolder"
                    className={cn(' w-3/5 break-words items-center py-5  h-auto',{
                        'line-through': isCompleted,


                    })}
                >
					{title}
                    {date && <span className='ml-10 text-zinc-400'>{date}</span>}



				</div>


            <div id="Radio">

                <FormControl className='text-zinc-400'>
                    <FormLabel id="demo-radio-buttons-group-label" style={{color:'#8f9fa6'}} className='hidden lg:block'>Weight</FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                        style={{display:'inline-block'}}
                        value={selectedValue}
                        onChange={handleRadioChange}

                    >
                        <FormControlLabel value="High" control={<Radio />} label="High"  />
                        <FormControlLabel value="Middle" control={<Radio />} label="Middle" />
                        <FormControlLabel value="Low" control={<Radio />} label="Low"  />
                    </RadioGroup>
                </FormControl>
            </div>

            <div className='w-16 flex justify-between '>


                <button onClick={() => removeTodo(id)}>
                    <BsTrash
                        size={22}
                        className='text-gray-600 hover:text-red-700 transition-colors ease-in-out duration-300'
                    />
                </button>





            </div>


        </div>
        </Reorder.Item>
    )
}

export {TodoItem};
