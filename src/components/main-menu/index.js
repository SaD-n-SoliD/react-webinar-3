import { cn as bem } from "@bem-react/classname";
import { memo } from "react";
import './style.css';

function MainMenu({ children, basketTool }) {
  const cn = bem('MainMenu')
  return (
    <div className={cn()}>
      {children}
      <div className={cn('right')}>
        {basketTool}
      </div>
    </div>
  )
}

export default memo(MainMenu)