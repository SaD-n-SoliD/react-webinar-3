import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class CatalogCategoriesState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      list: [],
      waiting: false,
    };
  }

  async load() {
    // Установка признака загрузки категорий
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Загружаем список категорий товаров из АПИ',
    );

    const response = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        waiting: false,
      },
      'Загружен список категорий товаров из АПИ',
    );
  }
}

export default CatalogCategoriesState;
