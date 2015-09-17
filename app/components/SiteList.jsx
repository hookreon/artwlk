import React from 'react';

// styles
import '../styles/components/SiteList';

export default class SiteList extends React.Component {
  constructor(props) {
    super(props);

    this.siteDetailClick = this.siteDetailClick.bind(this);
  }

  siteDetailClick(event) {
    const router = this.context.router;
    this.props.getCurrSite(event.target.dataset.route);
    router.transitionTo('sites-detail', { siteId: event.target.dataset.route });
  }

  render() {
    let sites = this.props.sites;

    if (this.props.limit) {
      sites = sites.slice(0, parseInt(this.props.limit, 10));
    }

    const siteList = sites.map((data, index) => {
      return (
        <li key={index}>
          {data.imageUrl && <img src={data.imageUrl}/>}
          {data.name && <h3 data-route={data.id} onClick={this.siteDetailClick}>{data.name}</h3>}
          {data.artist && <h5>{data.artist}</h5>}
          {data.coords && <h5>{data.coords}</h5>}
          {data.architecture && <h6>{data.architecture}</h6>}
          {data.streetArt && <h6>{data.streetArt}</h6>}
          {data.description && <p>{data.description}</p>}
        </li>
      );
    });

    return (
      <ul>
        {siteList}
      </ul>
    );
  }
}

SiteList.contextTypes = {
  router: React.PropTypes.func,
};

SiteList.propTypes = {
  sites: React.PropTypes.array,
  getCurrSite: React.PropTypes.func,
  limit: React.PropTypes.string,
};
