import * as translations from './translations';
/**
 * Сервис мультиязычности
 */
class I18n {
  /**
   * @param services {Services}
   * @param config {Object}
   * @param initState {Object}
   */
  constructor(services, config = {}, initState = this.initState()) {
    this.services = services;
    this.config = config;
    this.state = initState;
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

  initState() {
    return {
      locale: 'ru',
    }
  }

  // Восстановление языковых настроек
  remind() {
    const lang = localStorage.getItem('lang')
    this.setLocale(lang, 'Настройки языка восстановлены')
  }

  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState, description = '') {
    if (this.config.log) {
      console.group(
        `%c${'i18n.setState'} %c${description}`,
        `color: ${'#777'}; font-weight: normal`,
        `color: ${'#333'}; font-weight: bold`,
      );
      console.log(`%c${'prev:'}`, `color: ${'#d77332'}`, this.state);
      console.log(`%c${'next:'}`, `color: ${'#2fa827'}`, newState);
      console.groupEnd();
    }
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener(this.state);
  }


  setLocale(code, description = 'setLang') {
    if (!(code in translations)) return
    this.setState({
      ...this.getState(),
      locale: code,
    },
      description
    )
    this.services.api.setHeader(this.config.langHeader, code);
    // Cохраняем текущий язык в localStorage
    localStorage.setItem('lang', code);
  }

  /**
   * Перевод фразу по словарю
   * @param text {String} Текст для перевода
   * @param [options] {Object} Параметры
   * @param [options.lang] {String} Код языка
   * @param [options.plural] {Number} Число для плюрализации
   * @returns {String} Переведенный текст
   */
  translate(text, { lang, plural } = {}) {
    const l = lang || this.getState().locale
    let result = translations[l] && text in translations[l] ? translations[l][text] : text;

    if (typeof plural !== 'undefined') {
      const key = new Intl.PluralRules(l).select(plural);
      if (key in result) {
        result = result[key];
      }
    }

    return result;
  }
}

export default I18n;
