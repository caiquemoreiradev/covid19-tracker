import React from 'react';

import numeral from 'numeral';

import './styles.css';

function Table({countries}) {
  return (
    <div className="container__table">
      {countries.map(({country, cases}) => (
        <tr>
          <td>{country}</td>
          <td><strong>{numeral(cases).format('0,0')}</strong></td>
        </tr>
      ))}
    </div>
  );
}

export default Table;