import React, {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, useState} from "react";
import {filterValuesType} from "./App";

type ToDoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (filter: filterValuesType) => void
    addTask: (title: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
export const ToDoList = (props: ToDoListPropsType) => {
    const [input, setInput] = useState<string>(" ")
    const onClickAddTaskHandler = () => {
        const trimmedInput = input.trim()  //удаляем пробелы
        if (trimmedInput) {     //когда не пустая строка-true
            props.addTask(input)
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

    const tasksListItems = props.tasks.map(t => {
        const onClickHandler = () => props.removeTask(t.id)
        return <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onClickHandler}>delete
                </button>
            </li>
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={input}
                       onChange={onChangeInputHandler}
                       onKeyPress={onKeyPressHandler}
                />
                <button onClick={onClickAddTaskHandler}
                >+
                </button>
            </div>
            <ul>{tasksListItems}</ul>
            <div>
                <button onClick={onAllClickHandler}>All</button>
                <button onClick={onActiveClickHandler}>Active</button>
                <button onClick={onCompletedClickHandler}>Completed</button>
            </div>
        </div>
    );
}
export default ToDoList;
