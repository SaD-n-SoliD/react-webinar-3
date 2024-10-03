import PropTypes from "prop-types";
import { memo } from "react";
import { cn as bem } from '@bem-react/classname';
import './style.css';

function UserProfile({ title, data, t }) {
  const cn = bem('UserProfile')
  return (
    <div className={cn()}>
      <h2>{title}</h2>
      <div className={cn('field')}>
        <span className={cn('label')}>{t('profile.name')}: </span>
        <span className={cn('value')}>{data.name}</span>
      </div>
      <div className={cn('field')}>
        <span className={cn('label')}>{t('profile.phone')}: </span>
        <span className={cn('value')}>{data.phone}</span>
      </div>
      <div className={cn('field')}>
        <span className={cn('label')}>{t('profile.email')}: </span>
        <span className={cn('value')}>{data.email}</span>
      </div>
    </div>
  )
}

export default memo(UserProfile);

UserProfile.propTypes = {
  data: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
  title: PropTypes.string,
  t: PropTypes.func,
};