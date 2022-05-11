import {filterValuesType} from "../App";

export const filterReducer = (state: filterValuesType, action: changeFilterAC) => {
    switch (action.title) {
        case "CHANGE-TASK": {
            return action.payload.value
        }
        default: return state
    }
}
export type changeFilterAC = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (value: filterValuesType) => {
    return {
        title: "CHANGE-TASK",
        payload: {
            value: value
        }
    } as const
}