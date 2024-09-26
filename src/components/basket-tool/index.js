import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import { numberFormat, plural } from '../../utils';
import './style.css';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../store/lang/use-translation';

function BasketTool({ sum, amount, onOpen }) {
  const cn = bem('BasketTool');
  const { t } = useTranslation()
  return (
    <div className={cn()}>
      <Link to={'/'}>{t('homePage')}</Link>
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
      <button onClick={onOpen}>{t('buttonOpen')}</button>
    </div>
  );
}

BasketTool.propTypes = {
  onOpen: PropTypes.func.isRequired,
  sum: PropTypes.number,
  amount: PropTypes.number,
};

BasketTool.defaultProps = {
  onOpen: () => { },
  sum: 0,
  amount: 0,
};

export default memo(BasketTool);
