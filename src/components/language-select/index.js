import { LANGUAGES } from '/store/lang/constants';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import Select from '../select';

export default function LanguageSelect({ style }) {

  const store = useStore()

  const select = useSelector(state => ({
    lang: state.lang.current
  }))

  const onValueChange = (e) => store.actions.lang.set(e.currentTarget.value)

  return (
    <Select
      style={style}
      defaultValue={select.lang}
      onChange={onValueChange}
      options={LANGUAGES}
    />
  )
}

