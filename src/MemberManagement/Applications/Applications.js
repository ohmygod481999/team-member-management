import React, {Fragment} from 'react';
import {Route} from 'react-router-dom';

// DASHBOARDS

import ApplicationsList from './ApplicationsList';
import ApplicationDetail from './ApplicationDetail';

// Layout

import AppHeader from '../../Layout/AppHeader/';
import AppSidebar from '../../Layout/AppSidebar/';
import AppFooter from '../../Layout/AppFooter/';

// Theme Options
import ThemeOptions from '../../Layout/ThemeOptions/';

const Dashboards = ({match}) => (
    <Fragment>
        <ThemeOptions/>
        <AppHeader/>
        <div className="app-main">
            <AppSidebar/>
            <div className="app-main__outer">
                <div className="app-main__inner">
                    <Route exact path={`${match.url}/list`} component={ApplicationsList}/>
                    <Route exact path={`${match.url}/detail/:id`} component={ApplicationDetail}/>
                </div>
                <AppFooter/>
            </div>
        </div>
    </Fragment>
);

export default Dashboards;