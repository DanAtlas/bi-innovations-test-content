import type React from "react";
import type AppState from "../../state/state";

interface LayoutProps {
  state: AppState
  ready: boolean
  children: React.ReactNode
};

const Layout: React.FC<LayoutProps> = ({ state, ready, children }) => {
  if (!ready) {
    return <p className="text-center font-bold">Убедитесь что программа NCALayer запущен и перезагрузите страницу</p>
  }
  return (
    <div className="h-full">
      <div
        className={`
        antialiased font-sans
        text-gray-800 text-sm
      `}
      >
        <div className="w-full md:w-1/2 p-4 mx-auto">{children}</div>
      </div>
    </div>
  )
};

export default Layout;