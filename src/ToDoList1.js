import { useEffect, useState } from "react";
import "./ToDoList1.css";

export default function TodoListApp () {
    const [items, setItems] = useState([]);
    const [todotask, setTodotask] = useState("");
    const [editId, setEditId] = useState(null);
    useEffect(() => {
        const url = "https://jsonplaceholder.typicode.com/todos";
        // POST request using fetch inside useEffect React hook

        fetch(url)
            .then(response => response.json())
            .then(data => setItems(data));
    }, []);

    const HandleToDoValue = (e) => {
        setTodotask(e.target.value)
    }

    const HandleAddingTask = () => {
        if(!todotask){
           alert("please fill todoList before adding"); 
        }else {
            if(editId){
                let temp = [...items];

                temp = temp.map(item => {
                    if (item.id === editId) {
                      return { ...item, title: todotask};
                    }
                    return item;
                  });

                  setItems(temp);
                  setEditId(null);
                  setTodotask("");
            } else{
                const todoItem = [{title:todotask}, ...items];

                setItems(todoItem);
                setTodotask("");

            }

        }


    }

    const HandleEdit = (id) => {
        let newEditItem = items.find((elem) => {
            return elem.id === id;
        });
        console.log(newEditItem);
        setTodotask(newEditItem.title);
        setEditId(id);

    }

    const HandleDelete = (index) => {
        const updateditems = items.filter((elem) => {
            return index !== elem.id;
        });

        setItems(updateditems);
        
    }

    return(
        // main conatiner
        <div className="main">

            {/* title */}
        <div className="title">
            <h1>To Do List </h1>
        </div>

        {/* input field to type the to do task and add in the to do list */}
        <div className="addToDoList">
            <input value={todotask} onChange={HandleToDoValue} type="text" placeholder="Add your to do task here..."/>
            <div>
                {!editId?
                <img className="addToDoListIcon" src="https://cdn0.iconfinder.com/data/icons/ui-essence/32/_25ui-256.png"  alt="plusicon" onClick={HandleAddingTask}/>:
                <img className="addToDoListIcon" src="https://cdn0.iconfinder.com/data/icons/zondicons/20/refresh-256.png"  alt="plusicon" onClick={HandleAddingTask}/>}
            </div>
        </div>

        {/* List of to do task fetched from the URL */}
        <div>
            {items.map((info)=>{
                return(
                    <div className="todolist" key={info.id}>
                        <p className="todolistTitle">{info.title}</p>
                        <div className="todolistIcon">
                        <img className="icon" src="https://cdn2.iconfinder.com/data/icons/boxicons-solid-vol-2/24/bxs-edit-256.png"  alt="EditIcon" onClick={() => HandleEdit(info.id)}/>
                        <img className="icon" src="https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_delete_48px-256.png"  alt="DeleteIcon" onClick={()=> HandleDelete(info.id)}/>

                        </div>

                    </div>
                    
                    
                )
            })}
        </div>
        {console.log("itmes", items)}
        </div>

    )
}

