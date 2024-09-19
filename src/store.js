
/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.state.cart = initState.cart || []
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  // Инкапсуляция методов работы с корзиной
  cart = {
    addItem: this.#addCartItem.bind(this),
    deleteItem: this.#deleteCartItem.bind(this)
  }

  /**
   * Добавление товара в корзину по коду
   * @param code
   */
  #addCartItem(code) {
    const goodsItem = this.state.goods.find(item => item.code === code)
    if (!goodsItem) throw new Error(`Ошибка добавления товара в корзину: товара с кодом ${code} не существует!`);

    const itemIndex = this.state.cart.findIndex(item => item.code === code)

    // Возможно стоило использовать структуру данных MultiSet, но нужна сторонняя библиотека
    let newCart = [...this.state.cart]
    const cartItem = newCart[itemIndex]

    itemIndex === -1 ?
      newCart.push({ ...goodsItem, count: 1 }) :
      newCart[itemIndex] = { ...cartItem, count: cartItem.count + 1 }

    this.setState({
      ...this.state,
      cart: newCart
    });
  }

  /**
   * Удаление товара из корзины по коду
   * @param code
   */
  #deleteCartItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемого товара
      cart: this.state.cart.filter(item => item.code !== code),
    });
  }


}

export default Store;
