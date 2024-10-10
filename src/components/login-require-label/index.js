import { cn as bem } from "@bem-react/classname";
import "./style.css";
import { React, memo } from 'react';

function LoginRequireLabel({ children, onClose, closeLabel }) {
  const cn = bem('LoginRequireLabel')
  return (
    <div className={cn()}>
      <span>{children}</span>{onClose && '.'}
      {onClose &&
        <button className={cn('button')} onClick={onClose}>
          {closeLabel}
        </button>
      }
    </div>
  )
}

export default memo(LoginRequireLabel)