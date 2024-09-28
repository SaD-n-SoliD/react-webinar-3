import useSelector from "../use-selector";
import { config } from "./constants";

export function useTranslation() {

  const select = useSelector(state => ({
    lang: state.lang.current
  }))

  const translation = config.resources[select.lang].translation
  const fallbackTranslation = config.resources[config.fallbackLang].translation

  // get non-plural value
  const getValue = (data) => data?.one || data?.other || data

  return ({
    t: (key) => getValue(translation[key]) || getValue(fallbackTranslation[key]) || '',
    // Translate plural
    tp: (key) => translation[key] || fallbackTranslation[key] || {},
  })

}