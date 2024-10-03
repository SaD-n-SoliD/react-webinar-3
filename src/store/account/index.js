import useSelector from '../../hooks/use-selector';
import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class AccountState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      error: null,
      data: {},
    }
  }

  async loadData(token) {
    const url = '/api/v1/users/self?fields=*'
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      'Загружаем данные профиля'
    );
    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          'X-Token': token,
        },
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error.message || response.statusText);
      // console.log(json);

      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: null,
          data: json?.result || null,
        },
        'Данные профиля успешно загружены',
      );
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: e,
          data: {},
        },
        'Не удалось загрузить данные профиля' + ': ' + e.message,
      );
    }
  }
}

export default AccountState;
