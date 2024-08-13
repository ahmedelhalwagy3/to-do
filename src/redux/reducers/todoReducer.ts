import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../types/todoActionTypes';
import { Task } from '../actions/todoActions';

export interface State {
  tasks: Task[];
}

interface AddTaskAction {
  type: typeof ADD_TASK;
  id: number;
  task: string;
}

interface EditTaskAction {
  type: typeof EDIT_TASK;
  id: number;
  task: string;
}

interface DeleteTaskAction {
  type: typeof DELETE_TASK;
  id: number;
}

export type ActionTypes = AddTaskAction | EditTaskAction | DeleteTaskAction;

const initialState: State = {
  tasks: [], 
};

export const todoReducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, { id: action.id, task: action.task }],
      };
    case EDIT_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.id ? { ...task, task: action.task } : task
        ),
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.id),
      };
    default:
      return state;
  }
};
