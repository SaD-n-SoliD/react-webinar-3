import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';

function BasketTool({ sum, amount, openButton, labels, lang }) {
  const cn = bem('BasketTool');
  return (
    <div className={cn()}>
      <span className={cn('label')}>{labels.inBasket}:</span>
      <span className={cn('total')}>
        {amount
          ? `${amount} ${plural(amount, labels.goods, lang)} / ${numberFormat(sum)} ₽`
          : `${labels.empty}`}
      </span>
      {openButton}
    </div>
  );
}

BasketTool.propTypes = {
  openButton: PropTypes.node.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
  labels: PropTypes.shape({
    inBasket: PropTypes.string,
    goods: PropTypes.shape({
      zero: PropTypes.string,
      one: PropTypes.string,
      two: PropTypes.string,
      few: PropTypes.string,
      many: PropTypes.string,
      other: PropTypes.string,
    }),
    empty: PropTypes.string,
  }),
};

BasketTool.defaultProps = {
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
