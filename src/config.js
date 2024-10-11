const isProduction = process.env.NODE_ENV === 'production';

/**
 * Настройки сервисов
 */
const config = {
  store: {
    // Логировать установку состояния?
    log: !isProduction,
    // Настройки модулей состояния
    modules: {
      session: {
        // Названия токена в АПИ
        tokenHeader: 'X-Token',
        langHeader: 'X-Lang',
      },
    },
  },
  api: {
    baseUrl: '',
  },
  i18n: {
    // Логировать установку состояния?
    log: !isProduction,
    // Http заголовок для языка
    langHeader: 'X-Lang',
  },
};

export default config;
