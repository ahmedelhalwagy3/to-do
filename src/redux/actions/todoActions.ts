import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../types/todoActionTypes';

export interface Task {
  id: number;
  task: string;
}

export function addTask(task: string) {
  return {
    type: ADD_TASK,
    id: Date.now(),
    task,
  };
}

export function editTask(tsk: string, ID: number) {
  return {
    type: EDIT_TASK,
    id: ID,
    task: tsk,
  };
}

export function deleteTask(ID: number) {
  return {
    type: DELETE_TASK,
    id: ID,
  };
}
