import { memo, useCallback, useEffect, useLayoutEffect } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import LoginTool from '../../containers/login-tool';
import useSelector from '../../hooks/use-selector';
import { useNavigate } from 'react-router-dom';

function Login() {
  const token = useSelector(state => state.auth.token)
  const navigate = useNavigate()

  // Если залогинены: возвращаемся туда, откуда пришли
  useLayoutEffect(() => {
    if (token) navigate(-1)
  })

  const store = useStore()

  // При размонтировании компонента очищаем ошибки авторизации
  useEffect(() => {
    return () => {
      store.actions.auth.resetError()
    }
  }, [])

  const error = useSelector(state => state.auth.error)

  const { t } = useTranslate()

  const callbacks = {
    onLogin: useCallback((e) => {
      const data = {}
      for (const [key, value] of new FormData(e.currentTarget).entries())
        data[key] = value
      store.actions.auth.login(data)
    })
  }

  return (
    <PageLayout>
      <LoginTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <LoginForm t={t} onSubmit={callbacks.onLogin} error={error} />
    </PageLayout>
  );
}

export default memo(Login);
