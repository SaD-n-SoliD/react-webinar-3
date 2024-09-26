import StoreModule from '../module';

class Basket extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  // Метод можно вынести в модуль каталога, но пока в этом нет смысла, т.к. он используется только здесь.
  // Ещё можно устанавливать результат в state, но этот state никто не будет использовать
  /**
   * Получение товара из каталога (api)
   * @param _id Код товара
   */
  async loadById(id) {
    const response = await fetch(`/api/v1/articles/${id}`);
    const json = await response.json();
    return json.result
  }

  /**
   * Добавление товара в корзину
   * @param _id Код товара
   */
  async addToBasket(_id) {
    let sum = 0;
    // Ищем товар в корзине, чтобы увеличить его количество
    let exist = false;
    const list = this.getState().list.map(item => {
      let result = item;
      if (item._id === _id) {
        exist = true; // Запомним, что был найден в корзине
        result = { ...item, amount: item.amount + 1 };
      }
      sum += result.price * result.amount;
      return result;
    });

    if (!exist) {
      // Поиск товара в каталоге, чтобы его добавить в корзину.
      const item = await this.loadById(_id)
      list.push({ ...item, amount: 1 }); // list уже новый, в него можно пушить.
      // Добавляем к сумме.
      sum += item.price;
    }

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Добавление в корзину',
    );
  }

  /**
   * Удаление товара из корзины
   * @param _id Код товара
   */
  removeFromBasket(_id) {
    let sum = 0;
    const list = this.getState().list.filter(item => {
      if (item._id === _id) return false;
      sum += item.price * item.amount;
      return true;
    });

    this.setState(
      {
        ...this.getState(),
        list,
        sum,
        amount: list.length,
      },
      'Удаление из корзины',
    );
  }
}

export default Basket;
