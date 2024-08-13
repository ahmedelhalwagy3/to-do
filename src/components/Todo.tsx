import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, editTask, deleteTask, Task } from '../redux/actions/todoActions';
import Switch from 'react-switch'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/App.css'; 
import { useTheme } from '../themes/ThemeContext'; 
import SearchBar from './searchBar'; 

interface State {
  tasks: Task[];
}

const Todo: React.FC = () => {
  const [task, setTask] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [editTaskValue, setEditTaskValue] = useState<string>('');
  const dispatch = useDispatch();
  const tasks = useSelector((state: State) => state.tasks);
  const [search, setSearch] = useState<string>('');
  console.log(search);

  const { darkMode, toggleDarkMode } = useTheme();

  const handleAddTask = () => {
    if (task.trim()) {
      dispatch(addTask(task));
      setTask('');
    }
  };

  const handleEditTask = (task: Task) => {
    setEditTaskId(task.id);
    setEditTaskValue(task.task);
  };

  const handleSaveEdit = () => {
    if (editTaskValue.trim()) {
      dispatch(editTask(editTaskValue, editTaskId!));
      setEditTaskId(null);
      setEditTaskValue('');
    }
  };

  const handleDeleteTask = (id: number) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className={`vh-100 d-flex justify-content-center align-items-center ${darkMode ? 'dark-mode' : ''}`}>
      <div className="card" id="list1" style={{ borderRadius: '.75rem', backgroundColor: darkMode ? '#333' : '#eff1f2', width: '1200px', margin: '100px' }}>
        <div className="card-body py-4 px-4 px-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <p className="h1 text-center mt-3 mb-4 pb-3 text-primary">
              <FontAwesomeIcon icon={faCheckSquare} className="me-1" />
              <u>My Todo-s</u>
            </p>

            <SearchBar setSearch={setSearch} /> 

            <Switch 
              checked={darkMode} 
              onChange={toggleDarkMode} 
              offColor="#bbb"
              onColor="#333"
              offHandleColor="#fff"
              onHandleColor="#000"
              uncheckedIcon={false}
              checkedIcon={false}
            />
          </div>

          <div className="pb-2">
            <div className="card">
              <div className="card-body">
                <div className="d-flex flex-row align-items-center">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    id="exampleFormControlInput1"
                    placeholder="Add new..."
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                  />
                  <div>
                    <button type="button" className="btn btn-primary" onClick={handleAddTask}>Add</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />
          {tasks.filter((task)=>{
            return search.toLowerCase() === ''? 
            task : 
            task.task.toLowerCase().includes(search)
          }).map((task) => (
            <ul key={task.id} className="list-group list-group-horizontal rounded-0 bg-transparent">
              <li className="list-group-item d-flex align-items-center ps-0 pe-3 py-1 rounded-0 border-0 bg-transparent">
                <div className="form-check">
                  <input className="form-check-input me-0" type="checkbox" value="" id={`flexCheckChecked${task.id}`} aria-label="..." />
                </div>
              </li>
              <li className="list-group-item px-3 py-1 d-flex align-items-center flex-grow-1 border-0 bg-transparent">
                {editTaskId === task.id ? (
                  <div className="d-flex align-items-center">
                    <input
                      type="text"
                      className="form-control form-control-lg w-600" 
                      value={editTaskValue}
                      onChange={(e) => setEditTaskValue(e.target.value)}
                    />

                    <button type="button" className="btn btn-success ms-2" onClick={handleSaveEdit}>Save</button>
                    <button type="button" className="btn btn-secondary ms-2" onClick={() => setEditTaskId(null)}>Cancel</button>
                  </div>
                ) : (
                  <p className="lead fw-normal mb-0">{task.task}</p>
                )}
              </li>
              <li className="list-group-item ps-3 pe-0 py-1 rounded-0 border-0 bg-transparent">
                <div className="d-flex flex-row justify-content-end mb-1">
                  <a href="#!" className="text-info" title="Edit todo" onClick={() => handleEditTask(task)}>
                    <FontAwesomeIcon icon={faPencilAlt} className="me-3" />
                  </a>
                  <a href="#!" className="text-danger" title="Delete todo" onClick={() => handleDeleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </a>
                </div>
              </li>
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Todo;
