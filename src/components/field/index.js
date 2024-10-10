import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function Field({ label, error, children, spacing, style }) {
  const cn = bem('Field');
  return (
    <div className={cn({ spacing })} style={style}>
      {label && <label className={cn('label')}>{label}</label>}
      {children && <div className={cn('input')}>{children}</div>}
      {error && <div className={cn('error')}>{error}</div>}
    </div>
  );
}

Field.propTypes = {
  label: PropTypes.node,
  error: PropTypes.node,
  children: PropTypes.node,
  spacing: PropTypes.oneOf(['small']),
  style: PropTypes.object,
};

export default memo(Field);
