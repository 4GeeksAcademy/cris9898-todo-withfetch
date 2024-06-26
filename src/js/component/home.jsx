import React, { useContext, useState} from "react";
import { Context } from "./appContext";


const Home = () => {
    const { store, actions } = useContext(Context);
    const [newTodo, setNewTodo] = useState("");


    const handleInputChange = (e) => {
        setNewTodo(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter" && newTodo.trim() !== "") {
            actions.addTodos(newTodo);
            setNewTodo(""); // Clear input after adding
        }
    };

    const handleDelete = (id) => {
        actions.deleteTodo(id);
    };
    
    
    return (
        <div className="text-center">
            <div className="container">
                <h1>To do List:</h1>
                <div className="d-flex  justify-content-center gap-3">
                    <label>Write your to do:</label>
                    <input
                        type="text"
                        placeholder="Add your to Do's..."
                        value={newTodo}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                    />
                </div>
                <div className="border-top mt-2"></div>
                <div className="border-top card mt-2">
                    {store.todos.map((todo) => {
                        return (
                            <div key={todo.id} className="d-flex justify-content-evenly align-items-center m-1">
                                <div>{todo.label}</div>
                                <button className="btn btn-danger" onClick={() => handleDelete(todo.id)}>
                                    <i className="fas fa-trash"></i>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
