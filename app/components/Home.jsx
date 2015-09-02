import React from 'react';
import { RouteHandler } from 'react-router';
import CreateSite from './Create';

export default class Home extends React.Component {
  render() {
    return (
      <div className="main">
        <nav className="nav">
          <CreateSite />
        </nav>
        <div className="container">
          <RouteHandler {...this.props} />
        </div>
      </div>
    );
  }
}
