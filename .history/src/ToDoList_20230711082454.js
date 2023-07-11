import React, { useEffect, useState } from 'react';
import "./ToDoList.css";

const baseUrl = "https://jsonplaceholder.typicode.com/todos";

const TodoList = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState([]);
  const [togglebtn, setTogglebtn] = useState(true);
  const [isEditItem, setIsEditItem] = useState(null);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch(baseUrl)
      .then(response => response.json())
      .then(data => setItems(data));
  };

  const createTodoItem = (item) => {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Created todo item:', data);
        setItems([data, ...items]);
        resetForm();
      })
      .catch(error => {
        console.error('Error creating todo item:', error);
      });
  };

  const updateTodoItem = (item) => {
    fetch(`${baseUrl}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    })
      .then(response => response.json())
      .then(data => {
        console.log('Updated todo item:', data);
        const updatedItems = items.map(elem =>
          elem.id === item.id ? data : elem
        );
        setItems(updatedItems);
        resetForm();
      })
      .catch(error => {
        console.error('Error updating todo item:', error);
      });
  };

  const deleteTodoItem = (id) => {
    fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Deleted todo item with ID:', id);
        const updatedItems = items.filter(item => item.id !== id);
        setItems(updatedItems);
      })
      .catch(error => {
        console.error('Error deleting todo item:', error);
      });
  };

  const addToDo = () => {
    if (!inputData) {
      alert('Please fill the ToDo task before adding');
    } else if (inputData && !togglebtn) {
      const updatedItems = items.map(elem =>
        elem.id === isEditItem ? { ...elem, title: inputData } : elem
      );
      const editedItem = updatedItems.find(item => item.id === isEditItem);
      updateTodoItem(editedItem);
    } else {
      const newTodoItem = { title: inputData, completed: false };
      createTodoItem(newTodoItem);
    }
  };

  const editToDo = (id) => {
    let newEditItem = items.find((elem) => elem.id === id);
    setTogglebtn(false);
    setInputData(newEditItem.title);
    setIsEditItem(id);
  };

  const resetForm = () => {
    setTogglebtn(true);
    setInputData('');
    setIsEditItem(null);
  };

  return (
    <>
      <div className="main">
        <div className='title'>
          <h1> Your To Do List</h1>
        </div>

        <div className="addToDoList">
          <input
            type="text"
            placeholder="Add Your To Do Task Here..."
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {togglebtn ? (
            <img
              alt="AddIcon"
              className="addToDoListIcon"
              src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_add-256.png"
              onClick={addToDo}
            />
          ) : (
            <img
              alt="Update-Icon"
              className="addToDoListIcon"
              src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/refresh-256.png"
              onClick={addToDo}
            />
          )}
        </div>

        <div className="showItems">
          {items.map((elem) => (
            <div className="todolist" key={elem.id}>
              <h3 className="todolistTitle">{elem.title}</h3>
              <div className="todolistIcon">
                <img
                  alt="Edit-Icon"
                  className="icon"
                  src="https://cdn2.iconfinder.com/data/icons/boxicons-solid-vol-2/24/bxs-edit-256.png"
                  onClick={() => editToDo(elem.id)}
                />
                <img
                  alt="Delete-Icon"
                  className="icon"
                  src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_delete_48px-512.png"
                  onClick={() => deleteTodoItem(elem.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default TodoList;
