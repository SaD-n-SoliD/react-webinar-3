import './style.css';
import { memo } from "react";
import { cn as bem } from '@bem-react/classname';

function LoginForm({ t, onSubmit = () => { }, error }) {
  const cn = bem('LoginForm')
  return (
    <form method="POST" className={cn()} onSubmit={(e) => { e.preventDefault(); onSubmit(e) }}>
      <h2 className={cn('title')}>{t('login.title')}</h2>
      <div className={cn('field')}>
        <div className={cn('label')}><label htmlFor="login">{t('login.login')}</label></div>
        <div className={cn('value')}><input name="login" id="login" /></div>
      </div>
      <div className={cn('field')}>
        <div className={cn('label')}><label htmlFor="password">{t('login.password')}</label></div>
        <div className={cn('value')}><input name="password" id="password" /></div>
      </div>
      {error && <div className={cn('error')}>{error?.message}</div>}
      <button className={cn('button')}>{t('login.button')}</button>
    </form>
  )
}

export default memo(LoginForm)