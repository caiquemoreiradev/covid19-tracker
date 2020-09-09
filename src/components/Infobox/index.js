import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

import './styles.css';

function Infobox({ title, cases, total, isRed, active, ...props }) {
  return (
          <Card onClick={props.onClick} className={`infoBox ${active && 'infoBox__selected'} ${isRed && 'infoBox__red'}`}>
              <CardContent>
                  <Typography className='infoBox__title' color='textSecondary'>
                      {title}
                  </Typography>

                  <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases__green'}`}>{cases}</h2>

                  <Typography className='infoBox__total' color='textSecondary'>
                      {total} Total
                  </Typography>
              </CardContent>
          </Card>
  );
}

export default Infobox;