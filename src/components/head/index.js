import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { LANGUAGES } from '/store/lang/constants';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Head({ title }) {

  const store = useStore()

  const select = useSelector(state => ({
    lang: state.lang.current
  }))

  const onValueChange = (e) => store.actions.lang.set(e.currentTarget.value)

  return (
    <div className="Head">
      <h1>{title}</h1>
      <select className="lang" defaultValue={select.lang} onChange={onValueChange}>
        {LANGUAGES.map(({ code, label }) => (
          <option key={code} value={code}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
