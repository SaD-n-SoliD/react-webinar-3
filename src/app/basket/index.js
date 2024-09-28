import { memo, useCallback } from 'react';
import ItemBasket from '../../components/item-basket';
import List from '../../components/list';
import ModalLayout from '../../components/modal-layout';
import BasketTotal from '../../components/basket-total';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../store/lang/use-translation';

function Basket() {
  const store = useStore();

  const { t } = useTranslation()

  const select = useSelector(state => ({
    list: state.basket.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Удаление из корзины
    removeFromBasket: useCallback(_id => store.actions.basket.removeFromBasket(_id), [store]),
    // Закрытие любой модалки
    closeModal: useCallback(() => store.actions.modals.close(), [store]),
  };

  const renders = {
    itemBasket: useCallback(
      item => {
        const title = <Link to={`/catalog/${item._id}`}>{item.title}</Link>;
        return <ItemBasket item={{ ...item, title }} onRemove={callbacks.removeFromBasket} removeButtonLabel={t('buttonDelete')} />;
      },
      [callbacks.removeFromBasket],
    ),
  };

  return (
    <ModalLayout title={t('basketTitle')} onClose={callbacks.closeModal} closeButtonLabel={t('buttonClose')}>
      <List list={select.list} renderItem={renders.itemBasket} />
      <BasketTotal sum={select.sum} />
    </ModalLayout>
  );
}

export default memo(Basket);
