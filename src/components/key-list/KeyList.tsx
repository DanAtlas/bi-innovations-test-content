import type React from "react";
import type AppState from "../../state/state";
import Client, { Response, extractKeyAlias } from "@seithq/ncalayer";
import {
  checkInputs,
  ValidationType,
  handleError,
  isNullOrEmpty,
} from "../../utils/helpers";
import Button from "../button/Button";
import Select from "../select/Select";

interface KeyListProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
};

const KeyList: React.FC<KeyListProps> = ({ client, state, setState }) => {
  const handleKeyAliasChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState({ ...state, keyAlias: extractKeyAlias(e.target.value) })
  }

  const handleKeyAliasClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
    })
    if (ok) {
      client.getKeys(
        state.alias,
        state.path,
        state.password,
        state.keyType,
        (resp: Response) => {
          if (resp.isOk()) {
            const keys: string[] = []
            resp
              .getResult()
              .split("\n")
              .forEach(el => {
                if (isNullOrEmpty(el)) return
                keys.push(el)
              })

            setState({
              ...state,
              method: client.method,
              keys: keys,
              keyAlias: keys.length > 0 ? extractKeyAlias(keys[0]) : "",
            })

            return
          }

          setState({ ...state, keys: [], keyAlias: "" })
          handleError(
            resp,
            ValidationType.Password &&
              ValidationType.PasswordAttemps &&
              ValidationType.KeyType
          )
        }
      )
    }
  }

  return (
    <div className="KeyList">
      <h2 className="font-bold">Список ключей</h2>
      <div className="mt-4 flex flex-row justify-between">
        <Select onChange={handleKeyAliasChange}>
          {state.keys.map((v, i) => {
            return (
              <option key={i} value={v}>
                {v}
              </option>
            )
          })}
        </Select>
        <Button onClick={handleKeyAliasClick}>Обновить список ключей</Button>
      </div>
    </div>
  )
};

export default KeyList;