import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import './style.css';

function MainMenu({ children }) {
  const cn = bem('MainMenu')
  return (
    <div className={cn()}>
      {children}
    </div>
  )
}

export default memo(MainMenu)