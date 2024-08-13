import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './redux/store';
import Login from './components/login';
import Todo from './components/Todo';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './themes/ThemeContext'; 

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/to-do" element={<Todo />} />
            </Routes>
          </Router>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
