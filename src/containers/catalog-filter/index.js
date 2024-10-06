import { memo, useCallback, useEffect, useMemo } from 'react';
import useTranslate from '../../hooks/use-translate';
import useStore from '../../hooks/use-store';
import useSelector from '../../hooks/use-selector';
import Select from '../../components/select';
import Input from '../../components/input';
import SideLayout from '../../components/side-layout';
import Spinner from '../../components/spinner';
import { DataTree } from '../../utils';

/**
 * Контейнер со всеми фильтрами каталога
 */
function CatalogFilter() {
  const store = useStore();

  const select = useSelector(state => ({
    sort: state.catalog.params.sort,
    query: state.catalog.params.query,
    category: state.catalog.params.category,
    categoryList: state.catalogCategories.list,
    categoryWaiting: state.catalogCategories.waiting,
  }));

  useEffect(() => {
    store.actions.catalogCategories.load();
  }, [])

  const callbacks = {
    // Сортировка
    onSort: useCallback(sort => store.actions.catalog.setParams({ sort }), [store]),
    // Фильтрация
    onFilter: useCallback(category => store.actions.catalog.setParams({ category, page: 1 }), [store]),
    // Поиск
    onSearch: useCallback(query => store.actions.catalog.setParams({ query, page: 1 }), [store]),
    // Сброс
    onReset: useCallback(() => store.actions.catalog.resetParams(), [store]),
  };

  const options = {
    sort: useMemo(
      () => [
        { value: 'order', title: 'По порядку' },
        { value: 'title.ru', title: 'По именованию' },
        { value: '-price', title: 'Сначала дорогие' },
        { value: 'edition', title: 'Древние' },
      ],
      [],
    ),
    filter: useMemo(
      () => [{ value: '', title: 'Все' }].concat(
        new DataTree(select.categoryList)
          .toFlatArray()
          .map(
            ({ data: { _id, title }, level }) =>
              ({ value: _id, title, level: level - 1 })
          )
      ),
      [select.categoryList],
    ),
  };

  const { t } = useTranslate();

  return (
    <SideLayout padding="medium">
      <Spinner active={select.categoryWaiting}>
        <Select options={options.filter} value={select.category} onChange={callbacks.onFilter} />
      </Spinner>
      <Select options={options.sort} value={select.sort} onChange={callbacks.onSort} />
      <Input
        value={select.query}
        onChange={callbacks.onSearch}
        placeholder={'Поиск'}
        delay={1000}
      />
      <button onClick={callbacks.onReset}>{t('filter.reset')}</button>
    </SideLayout>
  );
}

export default memo(CatalogFilter);
