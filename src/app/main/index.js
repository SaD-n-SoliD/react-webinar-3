import { memo, useCallback, useEffect } from 'react';
import Item from '../../components/item';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import List from '../../components/list';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Pagination from '../../components/pagination';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from '../../store/lang/use-translation';
import LanguageSelect from '../../components/language-select';
import MainMenu from '../../components/main-menu';

function Main() {
  const store = useStore();
  const { t } = useTranslation();

  // Можно вынести в отдельный хук или хранить в сторе
  // Но сейчас хранение в адресной строке даёт преимущества, 
  //  а хранение в сторе - лишь недостатки (бойлерплейт, state не используется или нет фичи)
  // route param :page
  let { page } = useParams();
  page = +page
  if (!page) page = 1

  const select = useSelector(state => ({
    articlesCount: state.catalog.articlesCount,
    list: state.catalog.list,
    amount: state.basket.amount,
    sum: state.basket.sum,
    lang: state.lang.current,
  }));

  const articlesPerPage = 10;

  useEffect(() => {
    store.actions.catalog.load(page, articlesPerPage);
  }, [page]);

  const pageCount = Math.ceil(select.articlesCount / articlesPerPage);

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
    // Переключение страницы с товарами
    setPage: useCallback((page) => store.actions.catalog.setPage(page), [store]),
  };

  const renders = {
    item: useCallback(
      item => {
        const title = <Link to={`./catalog/${item._id}`}>{item.title}</Link>;
        return <Item item={{ ...item, title }} onAdd={callbacks.addToBasket} addButtonLabel={t('buttonAdd')} />;
      },
      [callbacks.addToBasket, select.lang],
    ),
    withLink: useCallback(
      ({ num, children }) => {
        return <Link to={`./pages/${num}`}>{children}</Link>;
      },
      [],
    ),
  };

  return (
    <PageLayout
      head={
        <Head title={t('mainPageTitle')} >
          <LanguageSelect style={{ marginLeft: 'auto' }} />
        </Head>
      }
      menu={
        <MainMenu>
          <Link to={'/'}>{t('homePage')}</Link>
        </MainMenu>
      }
      tool={
        <BasketTool
          openButton={
            <button onClick={callbacks.openModalBasket}>
              {t('buttonOpen')}
            </button>
          }
          amount={select.amount}
          sum={select.sum}
        />
      }
    >
      <List list={select.list} renderItem={renders.item} />
      <Pagination pageCount={pageCount} currentPage={page} withAction={renders.withLink} />
    </PageLayout>
  );
}

export default memo(Main);
