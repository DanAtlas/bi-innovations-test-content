import type React from "react";
import AppState, { CheckState } from "../../state/state";
import Client from "@seithq/ncalayer";
import type { Response } from "@seithq/ncalayer";
import { checkInputs, ValidationType, handleError } from "../../utils/helpers";
import Button from "../button/Button";
import Input from "../input/Input";
import TextArea from "../textarea/TextArea";
import CheckBox from "../checkbox/CheckBox";

interface CMSSignatureFileProps {
  client: Client
  state: AppState
  setState: React.Dispatch<React.SetStateAction<AppState>>
};

const CMSSignatureFile: React.FC<CMSSignatureFileProps> = ({
  client,
  state,
  setState,
}) => {
  const handleCMSSignatureFromFileChoose = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    client.showFileChooser("ALL", "", (resp: Response) => {
      setState({
        ...state,
        method: client.method,
        cmsFilePath: resp.getResult(),
      })
    })
  }

  const handleCMSSignatureFromFileToggle = (
    e: React.MouseEvent<HTMLInputElement, MouseEvent>
  ) => {
    setState({ ...state, cmsFileSignatureFlag: e.currentTarget.checked })
  }

  const handleCMSSignatureFromFileClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const ok = checkInputs({
      path: state.path,
      alias: state.alias,
      password: state.password,
      keyAlias: state.keyAlias,
    })
    if (ok) {
      client.createCMSSignatureFromFile(
        state.alias,
        state.path,
        state.keyAlias,
        state.password,
        state.cmsFilePath,
        state.cmsFileSignatureFlag,
        (resp: Response) => {
          if (resp.isOk()) {
            setState({
              ...state,
              method: client.method,
              cmsFileSignatureSigned: resp.getResult(),
              cmsFileSignatureValid: CheckState.NotValidated,
              cmsFileSignatureMessage: "Не проверено",
            })

            return
          }

          handleError(
            resp,
            ValidationType.Password && ValidationType.PasswordAttemps
          )
        }
      )
    }
  }

  return (
    <div className="CMSSignatureFile">
      <h2 className="font-bold">Путь к файлу для подписи</h2>
      <div className="mt-4 flex flex-row justify-between">
        <Input type="text" readOnly value={state.cmsFilePath} />
        <Button onClick={handleCMSSignatureFromFileChoose}>Выбрать файл</Button>
      </div>
      <div className="mt-4 flex flex-row flex-wrap justify-between">
        <Button onClick={handleCMSSignatureFromFileClick}>
          Подпиcать данные
        </Button>
        <CheckBox
          onClick={handleCMSSignatureFromFileToggle}
          text="Включить данные в подпись"
        />
      </div>
      <br />
      <TextArea readOnly value={state.cmsFileSignatureSigned} />
    </div>
  )
};

export default CMSSignatureFile;