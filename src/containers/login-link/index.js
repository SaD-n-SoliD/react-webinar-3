import { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';

function LoginLink({ children }) {
  const location = useLocation();

  return (
    <Link to="/login" state={{ back: location.pathname }}>{children}</Link>
  )
}

export default memo(LoginLink);
