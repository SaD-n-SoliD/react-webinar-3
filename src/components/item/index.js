import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('Item')

function Item({ item, showCount, actions }) {

  return (
    <div
      className={cn()}
    >
      <div className={cn("code")}>{item.code}</div>
      <div className={cn("info")}>
        <div className={cn("title")}>
          {item.title}
        </div>
        <div className={cn("price")}>
          {item.price.toLocaleString() + ' ₽'}
        </div>
        {showCount &&
          <div className={cn("count")}>
            {item.count.toLocaleString() + ' шт'}
          </div>
        }
      </div>
      <div className={cn("actions")}>
        {actions}
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
  showCount: PropTypes.bool,
  actions: PropTypes.node,
};

export default React.memo(Item);
