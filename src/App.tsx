import React, { useState } from "react";
import { AppInput } from "./components/AppInput/AppInput";
import { LastnameInputValidator, NameInputValidator, NicknameInputValidator } from "./utils/form-validator";

function App() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log({ name, lastName, username });
  }

  return (
    <>
      <form onSubmit={handleSubmit} action="">
        <AppInput value={name} onChange={setName} validator={new NameInputValidator()} label="Name" />
        <AppInput value={lastName} onChange={setLastName} validator={new LastnameInputValidator()} label="Lasname" />
        <AppInput value={username} onChange={setUsername} validator={new NicknameInputValidator()} label="Username" />
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
