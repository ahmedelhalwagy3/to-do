import {LOGIN_REQUEST,LOGIN_SUCCESS,LOGIN_FAILURE} from '../types/authActionTypes'


export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (user: any) => ({ type: LOGIN_SUCCESS, payload: user });
export const loginFailure = (error: string) => ({ type: LOGIN_FAILURE, payload: error });