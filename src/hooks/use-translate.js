import { useMemo, useState, useEffect } from 'react';
import useServices from './use-services';
import shallowequal from 'shallowequal';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const i18nService = useServices().i18n
  const lang = i18nService.getState().locale
  const setLang = (code) => i18nService.setLocale(code)

  const [state, setState] = useState(() => i18nService.getState());

  const unsubscribe = useMemo(() => {
    // Подписка. Возврат функции для отписки
    return i18nService.subscribe(() => {
      const newState = i18nService.getState();
      setState(prevState => (shallowequal(prevState, newState) ? prevState : newState));
    });
  }, []); // Нет зависимостей - исполнится один раз

  // Отписка от store при демонтировании компонента
  useEffect(() => unsubscribe, [unsubscribe]);

  const i18n = useMemo(
    () => ({
      // Код локали
      lang,
      // Функция для смены локали
      setLang,
      // Функция для локализации текстов с замыканием на код языка
      t: (text, number) => i18nService.translate(text, { lang, plural: number })
    }),
    [lang],
  );
  return i18n
}
