import React from "react"
import "./style.css";
import { PropTypes } from "prop-types";
import { plural } from "../../utils";
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('cart-info')

function CartInfo({ items, variant = 'outside', label, openCartButton, style }) {

  const amount = items.reduce((acc, { count, price }) => acc + count * price, 0)
  const pluralWord = plural(items.length, { one: 'товар', few: 'товара', many: 'товаров' })

  const cartInfo = {
    outside: amount ?
      `${items.length.toLocaleString()} ${pluralWord} / ${amount.toLocaleString()} ₽`
      : 'Пусто',
    inside: `${amount.toLocaleString()} ₽`,
  }[variant]

  const labelClassName = {
    outside: cn('label', { outside: true }),
    inside: cn('label', { inside: true }),
  }[variant]

  const infoClassName = {
    outside: cn('info', { outside: true }),
    inside: cn('info', { inside: true }),
  }[variant]

  return (
    <div className={cn()}>
      <div className={cn("body")} style={style}>
        <span className={labelClassName}>{label}</span>
        <span className={infoClassName}>{cartInfo}</span>
      </div>
      {openCartButton}
    </div>
  )
}

export default React.memo(CartInfo)

CartInfo.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
      count: PropTypes.number,
      price: PropTypes.number,
    }),
  ).isRequired,
  label: PropTypes.string,
  openCartButton: PropTypes.node,
  // Объект CSS свойств
  style: PropTypes.object,
}