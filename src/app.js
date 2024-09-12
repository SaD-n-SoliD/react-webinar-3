import React from 'react';
import { createElement } from './utils.js';
import './styles.css';

import { pluralize } from './pluralize.js';

/**
 * Приложение
 * @param store {Store} Состояние приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className="App">
      <div className="App-head">
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className="App-controls">
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className="App-center">
        <div className="List">
          {list.map(item => (
            <div key={item.code} className="List-item">
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={() => store.selectItem(item.code)}
              >
                <div className="Item-code">{item.code}</div>
                <div className="Item-title">
                  <span>{item.title}</span>
                  <span>
                    {
                      !!item.selectionCounter &&
                      ` | Выделяли ${item.selectionCounter} ` +
                      pluralize(item.selectionCounter, 'раз', ['', 'а'])
                    }
                  </span>
                </div>
                <div className="Item-actions">
                  <button onClick={(e) => {
                    e.stopPropagation()
                    store.deleteItem(item.code)
                  }}
                  >
                    Удалить
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
