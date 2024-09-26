import './style.css'
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Main from './main';
import Basket from './basket';
import useStore from '../store/use-store';
import useSelector from '../store/use-selector';
import ErrorPage from './error-page';
import ArticlePage from './article-page';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: withModal(Main),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/pages/:page",
        element: null,
      }
    ]
  },
  {
    path: "/catalog/:id",
    element: withModal(ArticlePage),
    errorElement: <ErrorPage />,
  },
]);

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

function withModal(Component) {
  return React.createElement(() => {
    const activeModal = useSelector(state => state.modals.name);

    return (
      <>
        <Component />
        {activeModal === 'basket' && <Basket />}
      </>
    )
  },
    {}
  )
}
