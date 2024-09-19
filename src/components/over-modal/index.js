import { PropTypes } from "prop-types";
import React from "react";
import "./style.css"
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('over-modal')

export default function OverModal({ children, isOpen, closeButton, style, onClose = () => { } }) {

  return (
    <div
      className={isOpen ? cn({ active: true }) : cn()}
      onClick={onClose}
    >
      <div className={cn('container')}>
        <div
          onClick={e => e.stopPropagation()}
          className={cn('body')}
          style={style}
        >
          {children}
          {closeButton}
        </div>
      </div>
    </div>
  )
}

OverModal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  // Объект CSS свойств
  style: PropTypes.object,
  onClose: PropTypes.func,
}