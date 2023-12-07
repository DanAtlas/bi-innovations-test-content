import { Method } from "@seithq/ncalayer";

export enum CheckState {
  NotValidated = "notValidated",
  Failed = "failed",
  OK = "ok",
};

interface AppState {
  method: Method
  version: ""
  alias: string
  path: string
  password: string
  keyType: string
  keyAlias: string
  keys: string[]
  // cms signature form file
  cmsFilePath: string
  cmsFileSignatureFlag: boolean
  cmsFileSignatureSigned: string
  cmsFileSignatureValid: CheckState
  cmsFileSignatureMessage: string
};

export const initAppState = (): AppState => {
  return {
    method: Method.None,
    version: "",
    alias: "NONE",
    path: "",
    password: "",
    keyType: "SIGN",
    keyAlias: "",
    keys: [""],
    // cms signature form file
    cmsFilePath: "",
    cmsFileSignatureFlag: false,
    cmsFileSignatureSigned: "",
    cmsFileSignatureValid: CheckState.NotValidated,
    cmsFileSignatureMessage: "Не проверено",
  }
};

export default AppState;