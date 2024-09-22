import { PropTypes } from "prop-types";
import React, { useEffect, useRef } from "react";
import "./style.css"
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('over-modal')

export default function OverModal({ children, isOpen, closeButton, style, onClose = () => { } }) {

  // Костыльненько, но нам надо избежать прокрутки страницы при открытии модалки
  // Лучше добавлять css класс, но у нас в проекте нет даже файла с общими стилями, так что пусть побудет так
  isOpen ?
    document.body.style.overflow = 'hidden' :
    document.body.style.overflow = 'auto'

  // При удалении элемента списка размер тела модалки изменяется.
  // Так как тело модалки отцентрировано по вертикали, при изменении высоты оно центрируется заново и смещается, что не удобно для пользователя (например, поудалять все товары из корзины не выйдет, если кликать в одном месте)
  // Чтобы избежать этого зафиксируем минимальную высоту при открытии модалки, но вернём как было при закрытии

  // Можно прокидывать minHeight в style, а не установливать напрямую, но тогда придётся перерендерить компонент и появятся проблемы с тем, чтобы откатиться до minHeight из пропсов.
  // Ну а классов на все возможные размеры модалок не напасёшься. 
  const ref = useRef(null)

  useEffect(() => {
    isOpen ?
      ref.current.style.minHeight = ref.current.offsetHeight + 'px' :
      // Свойство  minHeight не анимируется, избегаем резкого изменения размеров перед закрытием
      setTimeout(() => {
        ref.current.style.minHeight = style.minHeight ? style.minHeight + 'px' : 'anyInvalidValue'
      }, 400);
  })

  return (
    <div
      className={isOpen ? cn({ active: true }) : cn()}
      onClick={onClose}
    >
      <div className={cn('container')}>
        <div
          ref={ref}
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