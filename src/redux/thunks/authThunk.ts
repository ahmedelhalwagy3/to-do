import { Dispatch } from 'redux';
import { loginRequest, loginSuccess, loginFailure } from '../actions/authActions';

export const login = (email: string, password: string) => async (dispatch: Dispatch) => {
  dispatch(loginRequest());

  try {
    const response = await fetch('https://dummyjson.com/users');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const users = data.users;

    const user = users.find((u: any) => u.email === email && u.password === password);

    if (user) {
      dispatch(loginSuccess(user));
    } else {
      dispatch(loginFailure('Invalid email or password'));
    }
  } catch (error) {
    dispatch(loginFailure('An error occurred.'));
    console.error('Error:', error);
  }
};
