import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import {filterValuesType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
    filter: filterValuesType
    changeTaskStatus: (taskID: string, isDone: boolean) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const ToDoList = (props: ToDoListPropsType) => {
    const [error, setError] = useState<boolean>(false)
    const [input, setInput] = useState<string>(" ")
    const onClickAddTaskHandler = () => {
        const trimmedInput = input.trim()  //удаляем пробелы
        if (trimmedInput) {     //когда не пустая строка-true
            props.addTask(input)
        } else {
            setError(true)
        }
        setInput("")
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>) => {
        if (e.key === "Enter") onClickAddTaskHandler()
    }
    const onAllClickHandler = () => {
        props.changeFilter("all")
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active")
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed")
    }
    const getTasksForRender = (tasks: Array<TaskType>, filter: filterValuesType) => {
        let tasksForRender;
        switch (filter) {
            case "completed":
                tasksForRender = tasks.filter(t => t.isDone === true)
                break
            case "active":
                tasksForRender = tasks.filter(t => t.isDone === false)
                break
            default:
                tasksForRender = tasks
        }
        return tasksForRender;
    }
    const tasksForRender: Array<TaskType> = getTasksForRender(props.tasks, props.filter)
    const tasksListItems = tasksForRender.length // if number of tasks !== 0
        ? tasksForRender.map(t => {
            const onChangeStatus = (e: ChangeEvent<HTMLInputElement>) =>
                props.changeTaskStatus(t.id, e.currentTarget.checked);
            return <li key={t.id}>
                <input type="checkbox"
                       checked={t.isDone}
                       onChange={onChangeStatus}/>
                <span className={t.isDone ? "isDone" : ""}>{t.title}</span>
                <button onClick={() => {
                    props.removeTask(t.id)
                }}>delete
                </button>
            </li>
        })
        : <span> No tasks to complete </span>
    const allBtnClasses = props.filter === "all" ? "activeFilter" : ""
    const activeBtnClasses = props.filter === "active" ? "activeFilter" : ""
    const completedBtnClasses = props.filter === "completed" ? "activeFilter" : ""
    const inputClasses = error ? "error" : ""

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={input}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                       className={inputClasses}
                />
                <button onClick={onClickAddTaskHandler}
                >+
                </button>
                {error && <div>ERROR</div> }
            </div>
            <ul>{tasksListItems}</ul>
            <div>
                <button onClick={onAllClickHandler} className={allBtnClasses}>All</button>
                <button onClick={onActiveClickHandler} className={activeBtnClasses}>Active</button>
                <button onClick={onCompletedClickHandler} className={completedBtnClasses}>Completed</button>
            </div>
        </div>
    );
}
export default ToDoList;
