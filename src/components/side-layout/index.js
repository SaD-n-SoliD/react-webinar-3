import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function SideLayout({ children, side, padding, gap = 'small', style }) {
  const cn = bem('SideLayout');
  return (
    <div className={cn({ side, padding, gap })} style={style}>
      {React.Children.map(children, child => (
        child &&
        <div key={child.key} className={cn('item')}>
          {child}
        </div>
      ))}
    </div>
  );
}

SideLayout.propTypes = {
  children: PropTypes.node,
  side: PropTypes.oneOf(['start', 'end', 'between']),
  padding: PropTypes.oneOf(['small', 'medium']),
  gap: PropTypes.oneOf(['small', 'medium']),
  style: PropTypes.object,
};

SideLayout.defaultProps = {};

export default memo(SideLayout);
