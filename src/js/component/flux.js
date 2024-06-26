const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            todos: [],
            apiUrl: "https://playground.4geeks.com/todo/users/cristobalJimenez"
        },
        actions: {
            getUserToDos: async () => {
                const store = getStore();

                try {
                    const response = await fetch (
						store.apiUrl,
						{
							method: "POST",
							body: JSON.stringify(
								
							),
							headers: {
								"Content-Type": "application/json",
							}
						}
						
					);
					if (response.ok) {
						const data = await response.json();
						
					}
                } catch (error) {
                    console.log("Entro en el Catch del getUserToDos")

                }
            },


            getTodos: async () => {
                const store = getStore();

                try {
                    const response = await fetch(store.apiUrl);
                    if (!response.ok) {
                        console.log("GetTodos antes del if")
                        throw new Error("No se encuentran tareas");
                        
                    }
                    const data = await response.json();
                   
                    console.log(data.todos)
                    setStore({ todos: data.todos });
                } catch (error) {
                    console.log("entro en el catch del getTodos");
                    console.log(error);
                }
            
            },
            addTodos: async (label) => {
                const store = getStore();
                const actions = getActions();
                try {
                    const response = await fetch(`https://playground.4geeks.com/todo/todos/cristobalJimenez`, {
                        method: "POST",
                        body: JSON.stringify({ label, is_done: false }),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        await actions.getTodos(); 
                    }
                } catch (error) {
                    console.log("Entro en el catch del addTodo");
                    console.log(error);
                }
            },
            
            deleteTodo: async (id) => {
                const store = getStore();
                try {
                    const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                        },
                    });

                    if (response.ok) {
                        const updatedTodos = store.todos.filter((todo) => todo.id !== id);
                        setStore({ todos: updatedTodos });
                    }
                } catch (error) {
                    console.log("Entro en el catch del deleteTodo");
                    console.log(error);
                }
            }

        }
    };
};

export default getState;