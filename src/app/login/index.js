import { memo, useCallback } from 'react';
import useStore from '../../hooks/use-store';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginForm from '../../components/login-form';
import LoginTool from '../../containers/login-tool';
import useSelector from '../../hooks/use-selector';

/**
 * Главная страница - первичная загрузка каталога
 */
function Login() {
  const store = useStore();

  const error = useSelector(state => state.auth.error)

  const { t } = useTranslate();

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
