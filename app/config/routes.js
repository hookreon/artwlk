import React from 'react';
import Home from '../components/Home';
import Map from '../components/Map';
import Tour from '../components/Tour';
import { Router, Route, DefaultRoute } from 'react-router';

export default (
  <Route name="app" path="/" handler={Home}>
    <Route name="Tour" handler={Tour} />
    <Route name="Map" handler={Map} />
    <DefaultRoute handler={Map} />
  </Route>
);
