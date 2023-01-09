import React from 'react';
import { Link } from 'gatsby';

import classes from './404.module.scss';

const NotFound = () => (
    <div className={classes['not-found']}>
        <div>
            <h1>Not Found (404)</h1>
            <p>The page does not exist. Back to <Link to='/'>homepage</Link>.</p>
        </div>
    </div>
);

export default NotFound;
