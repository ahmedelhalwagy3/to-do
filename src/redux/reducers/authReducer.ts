import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE } from '../types/authActionTypes';

export interface AuthState {
  user: any | null;
  loading: boolean;
  error: string;
}

export const initialState: AuthState = {
  user: null,
  loading: false,
  error: '',
};

export const authReducer = (state = initialState, action: any): AuthState => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { ...state, loading: true, error: '' };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
