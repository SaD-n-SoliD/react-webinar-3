import { useCallback, useContext, useEffect, useState } from 'react';
import { Routes, Route, useLocation, redirect } from 'react-router-dom';
import useSelector from '../hooks/use-selector';
import Main from './main';
import Basket from './basket';
import Article from './article';
import Login from './login';
import UserAccount from './user-account';
import useStore from '../hooks/use-store';

/**
 * Приложение
 * Маршрутизация по страницам и модалкам
 */
function App() {
  const store = useStore();

  const { activeModal, token } = useSelector(state => ({
    activeModal: state.modals.name,
    token: state.auth.token,
  }));

  // Закрываем модалки при смене url'а
  const location = useLocation()
  useEffect(() => {
    return () => {
      store.actions.modals.close()
    }
  }, [location])

  return (
    <>
      <Routes>
        <Route path={''} element={<Main />} />
        <Route path={'/articles/:id'} element={<Article />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'/profile'} element={<UserAccount />} />
      </Routes>

      {activeModal === 'basket' && <Basket />}
    </>
  );
}

export default App;
