import React, { useEffect, useReducer } from "react";
import { Auth } from "aws-amplify";

const state = {
  username: "",
  password: "",
  email: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "SETFORM":
      return { ...state, [action.formType]: action.formInput };
    default:
      return state;
  }
}

function App() {
  const [formState, dispatch] = useReducer(reducer, state);

  async function signUp() {
    await Auth.signUp({
      username: formState.username,
      password: formState.password,
      attributes: { email: formState.email }
    });
  }

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then(user => console.log({ user }))
      .catch(error => console.log({ error }));
  });
  return (
    <div className="App">
      <h1>Hello world</h1>
      <input
        placeholder="username"
        onChange={e =>
          dispatch({
            type: "SETFORM",
            formType: "username",
            formInput: e.target.value
          })
        }
      />
      <input
        placeholder="email"
        onChange={e =>
          dispatch({
            type: "SETFORM",
            formType: "email",
            formInput: e.target.value
          })
        }
      />
      <input
        placeholder="password"
        type="password"
        onChange={e =>
          dispatch({
            type: "SETFORM",
            formType: "password",
            formInput: e.target.value
          })
        }
      />
      <button onClick={signUp}>Sign Up</button>
    </div>
  );
}

export default App;
