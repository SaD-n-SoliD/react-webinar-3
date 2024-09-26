import useSelector from "../use-selector";
import { config } from "./constants";

export function useTranslation() {

  const select = useSelector(state => ({
    lang: state.lang.current
  }))

  const translation = config.resources[select.lang].translation
  const fallbackTranslation = config.resources[config.fallbackLang].translation
  return ({
    t: (key) => (translation[key] || fallbackTranslation[key])
  })

}