import { memo } from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function PageLayout({ head, footer, menu, tool, children }) {
  const cn = bem('PageLayout');

  return (
    <div className={cn()}>
      <div className={cn('head')}>{head}</div>
      <div className={cn('center')}>
        <div className={cn('centerHead')}>
          {menu}
          {tool}
        </div>
        {children}
      </div>
      <div className={cn('footer')}>{footer}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default memo(PageLayout);
