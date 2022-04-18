import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "completed";

function App() {

    const toDoList: string = "What to learn";
    let [tasks, setTasks] = useState<Array<TaskType>>([ //state, setState
        {id: v1(), title: "HTML", isDone: true},
        {id: v1(), title: "CSS", isDone: true},
        {id: v1(), title: "JS/TS", isDone: false}
    ]);

    const onClickRemoveTask = (taskID: string) => {
        const filteredTasksForRemove = tasks.filter(t => t.id !== taskID) //true>>new array
        setTasks(filteredTasksForRemove) //set new condition of array TASKS
    }
    const AddTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,    // аналогично title: title
            isDone: false
        }
        const copyTasks = [...tasks]
        copyTasks.push(newTask)
        setTasks(copyTasks)

    }
    const changeTaskStatus = (taskID: string, isDone: boolean) => {
        setTasks(tasks.map(t => t.id === taskID ? {...t, isDone: isDone} : t))
    }

    const [filter, setFilter] = useState<filterValuesType>("all")
    const onClickChangeFilter = (filter: filterValuesType) => {
        setFilter(filter)
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
