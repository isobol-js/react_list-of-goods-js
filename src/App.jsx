import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [goods, setGoods] = useState([...goodsFromServer]);
  const [sortType, setSortType] = useState(null);
  const [isReversed, setIsReversed] = useState(false);

  const handleAction = (action) => {
    let newGoods;

    switch (action) {
      case 'sortAlphabet':
        newGoods = [...goodsFromServer].sort((a, b) => a.localeCompare(b));
        setSortType('alphabet');
        setIsReversed(false);
        break;

      case 'sortLength':
        newGoods = [...goodsFromServer].sort((a, b) => a.length - b.length);
        setSortType('length');
        setIsReversed(false);
        break;

      case 'reverse':
        newGoods = [...goods].reverse();
        setIsReversed(!isReversed);

        return setGoods(newGoods);

      case 'reset':
        newGoods = [...goodsFromServer];
        setSortType(null);
        setIsReversed(false);
        break;

      default:
    }

    setGoods(newGoods);
  };

  const isModified = goods.length !== goodsFromServer.length ||
  goods.some((item, index) => item !== goodsFromServer[index]);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${sortType === 'alphabet' ? '' : 'is-light'}`}
          onClick={() => handleAction('sortAlphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${sortType === 'length' ? '' : 'is-light'}`}
          onClick={() => handleAction('sortLength')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={() => handleAction('reverse')}
        >
          Reverse
        </button>

        {isModified && (
          <button
            type="button"
            className="button is-danger"
            onClick={() => handleAction('reset')}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {goods.map(good => (
          <li data-cy="Good" key={good}>
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
