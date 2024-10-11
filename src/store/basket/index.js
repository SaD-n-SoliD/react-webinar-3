import StoreModule from '../module';

/**
 * Покупательская корзина
 */
class BasketState extends StoreModule {
  initState() {
    return {
      list: [],
      sum: 0,
      amount: 0,
    };
  }

  /**
   * Добавление товара в корзину
   * @param _id {String} Код товара
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
      const res = await this.services.api.request({ url: `/api/v1/articles/${_id}` });
      const item = res.data.result;

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

  async refresh() {
    const apiParams = {
      'search[ids]': this.getState().list.map(item => item._id).join('|')
    }
    try {
      const res = await this.services.api.request({ url: `/api/v1/articles?${new URLSearchParams(apiParams)}` });

      let list = res.data.result.items
      const prevList = this.getState().list
      let sum = 0
      const itemsToFilter = []

      // Переносим количество каждого товара из старого в новый list и пересчитываем общую сумму
      for (const newItem of list) {
        const itemCount = prevList.find(item => newItem._id === item._id)?.amount
        if (itemCount) {
          newItem.amount = itemCount
          sum += newItem.price * itemCount
        }
        // Если количество не найдено, товар должен быть удалён из корзины
        else itemsToFilter.push(newItem)
      }

      list = list.filter(item => !(item in itemsToFilter))

      this.setState(
        {
          ...this.getState(),
          list,
          sum,
          amount: list.length,
        },
        'Обновление корзины',
      );
    } catch (e) {
      //todo обработать ошибки обновления корзины
    }

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

export default BasketState;
