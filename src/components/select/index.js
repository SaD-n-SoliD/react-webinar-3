import PropTypes from 'prop-types'
import './style.css'
import { memo } from 'react'

function Select({ style, defaultValue, onChange = () => { }, options }) {
  return (
    <select className="Select" style={style} defaultValue={defaultValue} onChange={onChange}>
      {options.map(({ code, label }) => (
        <option key={code} value={code}>
          {label}
        </option>
      ))}
    </select>
  )
}

export default memo(Select)

Select.PropTypes = {
  style: PropTypes.object,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.shape({
    code: PropTypes.string,
    label: PropTypes.string,
  }),
}