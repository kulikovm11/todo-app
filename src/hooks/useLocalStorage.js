import {useEffect, useState} from "react";

const useLocalStorage = (key, initValue) => {

    const getValue = () =>{
        const storage = localStorage.getItem(key);
        if (storage){
            try {
                return JSON.parse(storage);
            } catch (error){
                console.error(`Error parsing stored value for key '${key}':`, error)
            }
        }
        return initValue;
    };
    const [value, setValue] = useState(getValue)

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    },[key,value])


    return [value, setValue]

};

export {useLocalStorage};
