import type React from "react";
import Input from "../input/Input";

interface StoragePathProps {
  path: string
};

const StoragePath: React.FC<StoragePathProps> = ({ path }) => {
  return (
    <div className="StoragePath">
      <h2 className="font-bold">Путь хранилища ключа</h2>
      <Input type="text" readOnly value={path} />
    </div>
  )
}

export default StoragePath;