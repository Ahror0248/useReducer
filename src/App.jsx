import React, { useState, useReducer } from "react";
import { Container } from "./AppStyle";
import ToDo from "./Todo";

const App = () => {
  const [name, setName] = useState(" ");

  const reducer = (state, action) => {
    switch (action.type) {
      case "add":
        return [
          ...state,
          { id: Date.now(), name: action.payload.name, completed: false },
        ];

        case 'toggle' : 
        return state.map(todo=>{
          if(todo.id === action.payload.id) {
            return{...todo, completed: !todo.completed}
          }
          return todo
        });

        case 'delete' : 
        return state.filter(todo=>action.payload.id!==todo.id)
        


      default:
        return state;
    }
  };
  const [todos, dispatch] = useReducer(reducer, []);

  const handleSubmit = () => {
    dispatch({ type: "add", payload: { name: name } });
    setName('')
  };

  return (
    <Container>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>
        {todos.map((value) => {
          return(
           <>
           <br />
           <ToDo value={value} dispatch={dispatch} />
           </>
          )
        })}
      </div>
    </Container>
  );
};

export default App;
