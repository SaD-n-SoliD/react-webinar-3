import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      page: 1,
      shownArticle: {},
    };
  }

  async load(page, limit = 10) {
    const skip = (page - 1) * limit
    const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        articlesCount: json.result.count,
      },
      'Загружены товары из АПИ',
    );
  }

  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        shownArticle: json.result,
      },
      'Загружен товар (по id) из АПИ',
    );
  }


}

export default Catalog;
