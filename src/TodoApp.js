import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), description: newTodo, isDone: false }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, isDone: !todo.isDone } : todo));
  };

  const editTodo = (id, newDescription) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, description: newDescription } : todo));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'done') return todo.isDone;
    if (filter === 'notdone') return !todo.isDone;
    return true;
  });

  return (
    <div className="container">
      <h1 className="my-4">Liste des tâches</h1>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Ajouter une tâche"
        />
        <button className="btn btn-primary" onClick={addTodo}>Ajouter</button>
      </div>

      <div className="btn-group mb-3">
        <button className="btn btn-secondary" onClick={() => setFilter('all')}>Toutes</button>
        <button className="btn btn-secondary" onClick={() => setFilter('done')}>Effectuées</button>
        <button className="btn btn-secondary" onClick={() => setFilter('notdone')}>Non effectuées</button>
      </div>

      <ul className="list-group">
        {filteredTodos.map(todo => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                checked={todo.isDone}
                onChange={() => toggleTodo(todo.id)}
              />
              <input
                type="text"
                className="form-control"
                value={todo.description}
                onChange={(e) => editTodo(todo.id, e.target.value)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoApp;
