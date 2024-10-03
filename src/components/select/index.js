import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Select(props) {
  const onSelect = e => {
    props.onChange(e.target.value);
  };
  return (
    <select className="Select" value={props.value} onChange={onSelect}>
      {props.options.map(item => (
        <option key={item.value} value={item.value}>
          {props.levelPrefix.repeat(item.level) + item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      level: PropTypes.number,
    }),
  ).isRequired,
  value: PropTypes.any,
  onChange: PropTypes.func,
  levelPrefix: PropTypes.string,
};

Select.defaultProps = {
  onChange: () => { },
  levelPrefix: '- ',
};

export default memo(Select);
