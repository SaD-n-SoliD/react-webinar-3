import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, openButton }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>В корзине:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, {
            one: 'товар',
            few: 'товара',
            many: 'товаров',
          })} / ${numberFormat(sum)} ₽`
          : `пусто`}
      </span>
      {openButton}
    </div>
  );
}

BasketTool.propTypes = {
  openButton: PropTypes.node.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
