import React, { useCallback, useState } from 'react';
import List from './components/list';
import Head from './components/head';
import PageLayout from './components/page-layout';
import Button from './components/button';
import CartInfo from './components/cart-info';
import OverModal from './components/over-modal';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const state = store.getState();

  const [modalIsOpen, setModalIsOpen] = useState(false)

  // 
  modalIsOpen ?
    document.body.style.overflow = 'hidden' :
    document.body.style.overflow = 'auto'

  const callbacks = {

    withAddActions: useCallback(
      code =>
        <Button
          stopPropagation
          onClick={() => store.cart.addItem(code)}
        >
          Добавить
        </Button>,
      [store]
    ),
    withDeleteActions: useCallback(
      code =>
        <Button
          stopPropagation
          onClick={() => store.cart.deleteItem(code)}
        >
          Удалить
        </Button>,
      [store]
    ),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <CartInfo
        items={state.cart}
        label={'В корзине:'}
        variant='outside'
        openCartButton={
          <Button
            size="md"
            onClick={() => setModalIsOpen(true)}
          >
            Перейти
          </Button>
        }
      />
      <List
        list={state.goods}
        withItemActions={callbacks.withAddActions}
      />
      <OverModal
        isOpen={modalIsOpen}
        style={{ width: 960, minHeight: 400 }}
        onClose={() => setModalIsOpen(false)}
        closeButton={
          <Button
            size="md"
            onClick={() => setModalIsOpen(false)}
            style={{ position: 'absolute', top: 32, right: 32 }}
          >
            Закрыть
          </Button>
        }
      >
        {/* Пока что выделять компонент под корзину не обязательно */}
        <Head title="Корзина" />
        <List
          list={state.cart}
          itemShowCount
          withItemActions={callbacks.withDeleteActions}
        />
        <CartInfo
          items={state.cart}
          label={'Итого'}
          variant='inside'
          style={{ marginRight: 85 }}
        />
      </OverModal>
    </PageLayout>
  );
}

export default App;
