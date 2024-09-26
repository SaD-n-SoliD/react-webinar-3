import StoreModule from '../module';
import { LANGUAGES, config } from "./constants";

class Lang extends StoreModule {

  initState() {
    return {
      current: 'ru'
    }
  }

  set(langCode) {
    const lang = LANGUAGES.find(lang => lang.code === langCode)?.code || config.fallbackLang
    this.setState(
      { current: lang },
      `Установлен язык: ${lang}`
    )
  }

}

export default Lang;
