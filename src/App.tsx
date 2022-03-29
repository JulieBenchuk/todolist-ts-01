import React from 'react';
import './App.css';
import ToDoList, {TaskType} from "./ToDoList";

function App() {
    const toDoList_1: string = "What to learn";
    const toDoList_2: string = "What to buy";
  /*  const toDoList_3 = "I don't know";*/

    const tasks_1: TaskType [] = [
        {id: 1, title: "HTML", isDone: true},
        {id: 2, title: "CSS", isDone: true},
        {id: 3, title: "JS/TS", isDone: false}
    ];
    const tasks_2: TaskType [] = [
        {id: 1, title: "Buckwheat", isDone: false},
        {id: 2, title: "Sugar", isDone: false},
        {id: 3, title: "Office paper", isDone: true}
    ];
    return (
        <div className="App">
            <ToDoList
                title={toDoList_1}
                tasks={tasks_1}
            />
            <ToDoList
                title={toDoList_2}
                tasks={tasks_2}
            />
        </div>
    );
}

export default App;
