import type React from "react";
import type AppState from "../../state/state";
import Input from "../input/Input";

interface PasswordProps {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
};

const Password: React.FC<PasswordProps> = ({ state, setState }) => {
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, password: e.target.value })
  }

  return (
    <div className="Password">
      <h2 className="font-bold">Пароль для хранилища</h2>
      <Input type="password" onChange={handlePasswordChange} />
    </div>
  )
};

export default Password;