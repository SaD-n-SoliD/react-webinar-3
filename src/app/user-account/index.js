import { memo, useEffect } from 'react';
import useTranslate from '../../hooks/use-translate';
import Navigation from '../../containers/navigation';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import LocaleSelect from '../../containers/locale-select';
import LoginTool from '../../containers/login-tool';
import UserProfile from '../../components/user-profile';
import useSelector from '../../hooks/use-selector';
import Spinner from '../../components/spinner';
import useStore from '../../hooks/use-store';
import useAuth from '../../hooks/use-auth';

function UserAccount() {
  const token = useAuth()

  const store = useStore()

  useEffect(() => {
    store.actions.account.loadData(token)
  }, [])

  const { name, phone, email, waiting } = useSelector(state => ({
    name: state.account.data?.profile?.name,
    phone: state.account.data?.profile?.phone,
    email: state.account.data?.email,
    waiting: state.account.waiting,
  }))

  const { t } = useTranslate()

  return (
    <PageLayout>
      <LoginTool />
      <Head title={t('title')}>
        <LocaleSelect />
      </Head>
      <Navigation />
      <Spinner active={waiting}>
        <UserProfile title={t('profile.title')} data={{ name, phone, email }} t={t} />
      </Spinner>
    </PageLayout>
  );
}

export default memo(UserAccount);
