import { describe, it, expect } from 'vitest';
import { todoReducer, State } from '../redux/reducers/todoReducer'; 
import { ADD_TASK, EDIT_TASK, DELETE_TASK } from '../redux/types/todoActionTypes';
import { ActionTypes } from '../redux/reducers/todoReducer'; 

describe('todoReducer', () => {
  it('should handle ADD_TASK', () => {
    const initialState: State = { tasks: [] };
    const action: ActionTypes = { type: ADD_TASK, id: 1, task: 'New Task' }; 
    const expectedState: State = { tasks: [{ id: 1, task: 'New Task' }] };
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle EDIT_TASK', () => {
    const initialState: State = { tasks: [{ id: 1, task: 'Old Task' }] };
    const action: ActionTypes = { type: EDIT_TASK, id: 1, task: 'Updated Task' }; 
    const expectedState: State = { tasks: [{ id: 1, task: 'Updated Task' }] };
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should handle DELETE_TASK', () => {
    const initialState: State = { tasks: [{ id: 1, task: 'Task to Remove' }, { id: 2, task: 'Another Task' }] };
    const action: ActionTypes = { type: DELETE_TASK, id: 1 }; 
    const expectedState: State = { tasks: [{ id: 2, task: 'Another Task' }] };
    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it('should return the current state for unknown actions', () => {
    const initialState: State = { tasks: [] };
    const action = { type: 'UNKNOWN_ACTION', id: 1, task: 'Unknown' } as any; 
    expect(todoReducer(initialState, action)).toEqual(initialState);
  });
});
