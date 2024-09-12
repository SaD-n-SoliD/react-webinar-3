/**
 * Хранилище состояния приложения
 */
class Store {
	constructor(initState = {}) {
		this.state = initState;

		const { list } = this.state

		this.itemCodeGenerator =
			this.generateItemCode(Math.max(0, ...list.map(el => el.code)))

		// Перебираем list, инициализируем selectionCounter
		for (const [i, el] of list.entries()) {
			this.state.list[i] = {
				...el,
				selectionCounter: 0
			}
		}

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

	/**
	 * Добавление новой записи
	 */
	addItem() {
		this.setState({
			...this.state,
			list: [...this.state.list, {
				code: this.itemCodeGenerator.next().value,
				title: 'Новая запись',
				selectionCounter: 0
			}],
		});
	}

	/**
	 * Удаление записи по коду
	 * @param code
	 */
	deleteItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.filter(item => item.code !== code),
		});
	}

	/**
	 * Выделение записи по коду
	 * @param code
	 */
	selectItem(code) {
		this.setState({
			...this.state,
			list: this.state.list.map(item => {
				if (item.code === code) {
					item.selected = !item.selected;
					// Если мы выделяем, а не снимаем выделение, то selectionCounter++
					if (item.selected) {
						item.selectionCounter++
					}
				} else {
					item.selected = false;
				}
				return item;
			}),
		});
	}

	* generateItemCode(base = 0) {
		let i = base + 1;
		while (true) {
			yield i++
		}
	}
}

export default Store;
