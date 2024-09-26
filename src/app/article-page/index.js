import Head from '../../components/head';
import PageLayout from '../../components/page-layout';
import { memo, useCallback, useEffect } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import { useParams } from 'react-router-dom';
import BasketTool from '../../components/basket-tool';
import ArticleInfo from '../../components/article-info';
import { useTranslation } from '../../store/lang/use-translation';


function ArticlePage() {
  const store = useStore();

  const { t } = useTranslation()

  // route param :id
  const { id } = useParams();

  useEffect(() => {
    store.actions.catalog.loadById(id);
  }, [id])

  const select = useSelector(state => ({
    shownArticle: state.catalog.shownArticle,
    amount: state.basket.amount,
    sum: state.basket.sum,
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(() => store.actions.basket.addToBasket(id), [store, id]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  const data = select.shownArticle

  return (
    <PageLayout
      head={<Head title={data.title || 'Загрузка...'} />}
    >
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {data.title &&
        <ArticleInfo
          data={data}
          actions={
            <button onClick={callbacks.addToBasket} >{t('buttonAdd')}</button>
          }
        />
      }
    </PageLayout>
  )
}

export default memo(ArticlePage);