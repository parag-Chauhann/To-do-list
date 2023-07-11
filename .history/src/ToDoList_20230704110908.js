import React, { useEffect, useState } from 'react';
import "./ToDoList.css";



// to get the data from API

const baseUrl = "https://jsonplaceholder.typicode.com/todos"



const TodoList = () => {

    const [inputData, setInputData] = useState('');
    const [items, setItems] = useState([]);
    const [togglebtn, setTogglebtn] = useState(true);
    const [isEditItem, setIsEditItem] = useState(null);

    // fetching data from API
    useEffect(() => {

        fetch(baseUrl)
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    // Adding data to the server
    const addToDo = () => {
        if (!inputData) {
            alert('Please fill the To Do Task before adding');
        } else if(inputData && !togglebtn) {
            setItems(
                items.map((elem) => {
                    if (elem.id === isEditItem) {
                        return { ...elem, title: inputData }
                    }
                    return elem;
                })
                
            )
                 setTogglebtn(true);

                 setInputData('');

                 setIsEditItem(null);
        } else {
            const allInputData = { id: new Date().getTime().toString(), title:inputData }
            setItems([allInputData, ...items]);
            setInputData('')
        }
    }

    


// function to edit the item
    
    
    const editToDo = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id
        });

        setTogglebtn(false);

        setInputData(newEditItem.title);

        setIsEditItem(id);

    }

        // function to delete the items
        const deleteToDo = (index) => {
            const updateditems = items.filter((elem) => {
                return index !== elem.id;
            });
    
            setItems(updateditems);
        }

    return (
        <>
            <div className="main">
                    <div className='title'>
                        <h1> Your To Do List</h1>
                    </div>

                    <div className="addToDoList">
                        <input type="text" placeholder="Add Your To Do Task Here..."
                           value={inputData} 
                           onChange={(e) => setInputData(e.target.value) }
                        />
                        {
                            togglebtn ? <img alt="AddIcon" className="addToDoListIcon" src="https://cdn4.iconfinder.com/data/icons/glyphs/24/icons_add-256.png" onClick={addToDo} /> :
                                 <img alt="Update-Icon" className="addToDoListIcon" src="https://cdn4.iconfinder.com/data/icons/wirecons-free-vector-icons/32/refresh-256.png" onClick={addToDo} />
                        }
                       
                    </div>

                    <div className="showItems">
                        
                        {
                            items.map((elem) => {
                                return (
                                    <div className="todolist" key={elem.id}>
                                        <h3 className='todolistTitle'>{elem.title}</h3>
                                        <div className="todolistIcon">
                                            <img  alt="Edit-Icon" className="icon" src="https://cdn2.iconfinder.com/data/icons/boxicons-solid-vol-2/24/bxs-edit-256.png" onClick={() => editToDo(elem.id)} />
                                            <img alt="Delete-Icon" className="icon" src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_delete_48px-512.png" onClick={() => deleteToDo(elem.id)} />
                                        </div>
                                  </div>
                                )
                            })

                        }
                {console.log("items", items)}
                    </div>

          </div>  
        </>
    )
}

export default TodoList