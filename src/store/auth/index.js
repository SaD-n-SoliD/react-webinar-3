import StoreModule from '../module';

/**
 * Состояние каталога - параметры фильтра и список товара
 */
class AuthState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
      waiting: false,
      error: null,
      token: localStorage.getItem('token') || null,
      userData: { profile: { name: localStorage.getItem('userName') } },
    };
  }

  async login(data) {
    await this.sendRequest({
      url: `/api/v1/users/sign`,
      method: 'POST',
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
      data,
      logMessages: {
        waiting: 'Попытка входа',
        success: 'Вход произведён успешно',
        error: 'Ошибка авторизации',
      },
      processToken: (token) => { if (token) localStorage.setItem('token', token) },
      processUserData: (userData) => { if (userData) localStorage.setItem('userName', userData.profile.name) },
    })
  }

  async logout() {
    await this.sendRequest({
      url: `/api/v1/users/sign`,
      method: 'DELETE',
      headers: {
        'X-Token': localStorage.getItem('token'),
      },
      logMessages: {
        waiting: 'Попытка выхода',
        success: 'Выход произведён успешно',
        error: 'Ошибка деавторизации',
      },
      processToken: (_) => { localStorage.removeItem('token') },
      processUserData: (_) => { localStorage.removeItem('userName') },
    })
  }


  async requireToken() {
    if (this.getState().token) return

  }

  async sendRequest({
    url,
    method = 'GET',
    headers = {},
    data,
    logMessages = {
      waiting: '',
      success: '',
      error: '',
    },
    isJson = true,
    processToken = (token) => { },
    processUserData = (userData) => { },
  }) {
    const uMethod = method.toUpperCase()
    this.setState(
      {
        ...this.getState(),
        waiting: true,
      },
      logMessages.waiting,
    );
    try {
      const response = await fetch(url, {
        method: uMethod,
        headers: isJson ?
          { 'Content-Type': 'application/json', ...headers }
          : headers,
        body: isJson ?
          JSON.stringify(data)
          : data,
      });

      const json = await response.json();
      if (!response.ok) throw new Error(json.error.message || response.statusText);
      // console.log(json);

      const token = json?.result?.token
      const userData = json?.result?.user
      // Обработка токена и данных пользователя
      processToken(token)
      processUserData(userData)

      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: null,
          token: token || null,
          userData: userData || null,
        },
        logMessages.success,
      );
    } catch (e) {
      this.setState(
        {
          ...this.getState(),
          waiting: false,
          error: e,
        },
        logMessages.error + ': ' + e.message,
      );
    }
  }
}

export default AuthState;
