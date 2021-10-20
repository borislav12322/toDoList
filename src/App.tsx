import React, {useState} from 'react';
import './App.css';
import {ToDoList} from "./ToDoList";
import {v1} from "uuid";

export type taskType = {
    id: string
    title: string
    isDone: boolean
}
export type FilterType = 'All' | 'Completed' | 'Active';

function App() {

    const [tasks, setTasks] = useState<Array<taskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
    ]);

    const removeTask = (tID: string) => {
        setTasks(tasks.filter(t => t.id !== tID))
    }
    
    const addTask = (title: string) => {
        setTasks([{id: v1(), title: title, isDone: false}, ...tasks]);
    }

    const [filter, setFilter] = useState<FilterType>('All');

    let filteredTasks = tasks;

    if(filter === 'Completed'){
        filteredTasks = tasks.filter(t => t.isDone)
    }
    if(filter === 'Active'){
        filteredTasks = tasks.filter(t => !t.isDone)
    }

    const changeFilter = (filter: FilterType) =>{
        setFilter(filter);
    }

    return (
        <div className="App">
            <ToDoList
                removeTask={removeTask}
                tasks={filteredTasks}
                toDoListTitle={'What to learn'}
                filter={filter}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
