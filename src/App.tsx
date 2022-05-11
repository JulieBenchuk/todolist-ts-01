import React, {useReducer, useState} from 'react';
import './App.css';
import {v1} from "uuid";
import ToDoList, {TaskType} from "./ToDoList";
import {addTaskActionCreator, removeTaskActionCreator, tasksReducer} from "./reducers/tasksReduser";
import {changeFilterAC, filterReducer} from "./reducers/filterReducer";

export type filterValuesType = "all" | "active" | "completed";

function App() {

    const toDoList: string = "What to learn";
    let [tasks, tasksDispatch] = useReducer(tasksReducer, [ //state, setState
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false}
    ]);

    const onClickRemoveTask = (taskID: string) => {
        tasksDispatch (removeTaskActionCreator(taskID))
    }
    const AddTask = (title: string) => {
        let newId = v1();
        tasksDispatch(addTaskActionCreator(title, newId))
    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        /*setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))*/
    }

    const [filter, filterDispatch] = useReducer(filterReducer,"all")
    const onClickChangeFilter = (filter: filterValuesType) => {
        filterDispatch(changeFilterAC(filter))
    }

    return (
        <div className="App">
            <ToDoList
                title={toDoList}
                tasks={tasks}
                addTask={AddTask}
                removeTask={onClickRemoveTask}
                changeFilter={onClickChangeFilter}
                filter={filter}
               changeTaskStatus={changeTaskStatus}

            />
        </div>
    );
}

export default App;
