import React from 'react';
import PropTypes from 'prop-types';
import Item from '/components/item';
import './style.css';
import { withNaming } from "@bem-react/classname";

const bem = withNaming({ n: '', e: '__', m: '_', v: '_' })
const cn = bem('List')

function List({ list, itemShowCount, withItemActions = () => { } }) {
  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item
            showCount={itemShowCount}
            item={item}
            actions={withItemActions(item.code)}
          />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  itemShowCount: PropTypes.bool,
  withItemActions: PropTypes.func,
};

export default React.memo(List);
