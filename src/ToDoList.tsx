import React, {useState, ChangeEvent, KeyboardEvent} from "react";
import {FilterType, taskType} from "./App";


type propsType = {
    tasks: Array<taskType>
    removeTask: (tID: string) => void
    toDoListTitle: string
    filter: FilterType
    changeFilter: (filter: FilterType) => void
    addTask: (title: string) => void
}

export const ToDoList = ({tasks, removeTask, toDoListTitle, changeFilter,addTask, ...props}: propsType) => {

    const [newTitle, setNewTitle] = useState('');
    let [error, setError] = useState<boolean>(true);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
        setError(false)
    }

    const addTaskOnClick = () => {
        if(newTitle.trim() !== ''){
            addTask(newTitle.trim());
            setNewTitle('');
            setError(true)
        }
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) =>{
        if(e.key === 'Enter'){
            addTaskOnClick()
        }
    }

    const filterTaskHandler = (filter: FilterType) => {
        changeFilter(filter)
    }

    return (
        <div>
            <h3>{toDoListTitle}</h3>
            <div>
                <input value={newTitle} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
                <button onClick={addTaskOnClick}>+</button>
                {error && <div>add new title</div>}
            </div>
            <ul>
                {tasks.map(t => {
                    return (
                        <li key={t.id}>
                            <button onClick={() => removeTask(t.id)}>x</button>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>filterTaskHandler('All')}>All</button>
                <button onClick={()=>filterTaskHandler('Active')}>Active</button>
                <button onClick={()=>filterTaskHandler('Completed')}>Completed</button>
            </div>
        </div>
    )
}