import React, {useState} from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";
import {v1} from "uuid";

export type filterValuesType = "all" | "active" | "completed";

function App() {
    console.log(v1());

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

    const [filter, setFilter] = useState<filterValuesType>("all")
    const onClickChangeFilter = (filter: filterValuesType) => {
        setFilter(filter)
    }

    let tasksForRender;
    switch (filter) {
        case "completed":
            tasksForRender = tasks.filter(t => t.isDone === true);
            break;
        case "active":
            tasksForRender = tasks.filter(t => t.isDone === false);
            break;
        default:
            tasksForRender = tasks;
    }

    return (
        <div className="App">
            <ToDoList
                title={toDoList}
                tasks={tasksForRender}
                addTask={AddTask}
                removeTask={onClickRemoveTask}
                changeFilter={onClickChangeFilter}

            />
        </div>
    );
}

export default App;
