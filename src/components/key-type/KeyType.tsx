import type React from "react";
import type AppState from "../../state/state";
import Radio from "../radio/Radio";

const options = [
  {
    value: "SIGN",
    text: "Для подписи",
  },
  {
    value: "AUTH",
    text: "Для аутентификаций",
  },
  {
    value: "ALL",
    text: "Любой",
  },
];

interface KeyTypeProps {
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
};

const KeyType: React.FC<KeyTypeProps> = ({ state, setState }) => {
  console.log('state', state.keyType)
  return (
    <div className="KeyType">
      <h2 className="font-bold">Тип ключа</h2>
      <div className="flex flex-row">
        {options.map(item => {
          return (
            <Radio
              key={item.value}
              text={item.text}
              onChange={e => {
                setState({ ...state, keyType: item.value })
              }}
              active={state.keyType === item.value}
            />
          )
        })}
      </div>
    </div>
  )
};

export default KeyType;