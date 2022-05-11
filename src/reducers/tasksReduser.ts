import {TaskType} from "../ToDoList";

export const tasksReducer = (state: Array<TaskType>, action: tasksReducerType) => {
    switch (action.title) {
        case "REMOVE-TASKS": {
            return state.filter(t=>t.id != action.payload.taskID)
        }
        case "ADD-TASK": {
            let newTask = {id: action.payload.newId, title: action.payload.title, isDone: false}
            return [newTask, ...state]
        }
        default:
            return state
    }
}
type tasksReducerType = removeTaskActionCreatorType | addTaskActionCreatorType

export type removeTaskActionCreatorType = ReturnType<typeof removeTaskActionCreator>
export const removeTaskActionCreator = (taskID: string) => {
    return {
        title: "REMOVE-TASKS",
        payload: {taskID}
    } as const
}


export type addTaskActionCreatorType = ReturnType<typeof addTaskActionCreator>
export const addTaskActionCreator = (title: string, newId: string) => {
    return {
        title: "ADD-TASK",
        payload: {
            title, newId
        }
    } as const
}