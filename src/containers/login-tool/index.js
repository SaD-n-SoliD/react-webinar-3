import { memo, useCallback } from "react";
import useTranslate from "../../hooks/use-translate";
import SideLayout from "../../components/side-layout";
import { Link } from "react-router-dom";
import useSelector from "../../hooks/use-selector";
import Spinner from "../../components/spinner";
import useStore from "../../hooks/use-store";

function LoginTool() {
  const store = useStore()

  const { token, waiting, userData } = useSelector(state => ({
    token: state.auth.token,
    waiting: state.auth.waiting,
    userData: state.auth.userData,
  }))

  const { t } = useTranslate()

  const callbacks = {
    logout: useCallback(() => {
      store.actions.auth.logout()
    })
  }

  return (
    <Spinner active={waiting}>
      <SideLayout side="end" gap="medium" style={{ padding: '10px 20px' }}>
        {token && <Link to="/profile">{userData?.profile?.name}</Link>}
        {token && <button onClick={callbacks.logout} >{t('logout')}</button>}
        {!token && <Link to="/login"><button>{t('login')}</button></Link>}
      </SideLayout>
    </Spinner>
  )
}

export default memo(LoginTool)