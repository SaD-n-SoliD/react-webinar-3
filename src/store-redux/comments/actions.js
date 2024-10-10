export default {
  /**
   * Загрузка комментариев
   * @param id
   * @return {Function}
   */
  load: id => {
    return async (dispatch, getState, services) => {
      // Сброс текущих комментариев и установка признака ожидания загрузки
      dispatch({ type: 'comments/load-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments?fields=items(_id,text,dateCreate,author(profile(name)),parent(_id,_type),isDeleted),count&limit=*&search[parent]=${id}`,
        });
        // Комментарии загружены успешно
        dispatch({ type: 'comments/load-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: 'comments/load-error' });
      }
    };
  },

  add: ({ text, parent }) => {
    return async (dispatch, getState, services) => {
      // Установка признака ожидания загрузки и сброс ошибки
      dispatch({ type: 'comments/add-start' });

      try {
        const res = await services.api.request({
          url: `/api/v1/comments`,
          method: 'POST',
          body: JSON.stringify({
            text,
            parent,
          })
        });
        if (!res.ok) throw new Error('Ошибка создания комментария');

        // Комментарий добавлен успешно
        dispatch({ type: 'comments/add-success', payload: { data: res.data.result } });
      } catch (e) {
        //Ошибка добавления комментария
        dispatch({ type: 'comments/add-error', payload: { error: e } });
      }
    };
  },

  reset: () => {
    return (dispatch) => {
      dispatch({ type: 'comments/reset' });
    }
  },
};
