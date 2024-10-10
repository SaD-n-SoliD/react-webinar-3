// Начальное состояние
export const initialState = {
  data: {},
  waiting: false, // признак ожидания загрузки
  addWaiting: false, // признак ожидания добавления нового комментария
  addError: null,
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case 'comments/load-start':
      return { ...state, data: {}, waiting: true };

    case 'comments/load-success':
      return { ...state, data: action.payload.data, waiting: false };

    case 'comments/load-error':
      return { ...state, data: {}, waiting: false }; //@todo текст ошибки сохранять?

    case 'comments/add-start':
      return { ...state, addwaiting: true, addError: null };

    case 'comments/add-success':
      return {
        ...state,
        data: {
          ...state.data,
          items: [
            ...state.data.items,
            action.payload.data,
          ]
        },
        addwaiting: false,
      };

    case 'comments/add-error':
      return { ...state, addwaiting: false, addError: action.payload.error };

    case 'comments/reset':
      return initialState

    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
