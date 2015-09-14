import React from 'react';

// styles
import '../styles/components/SiteDetail';

export default class SiteDetail extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getCurrSite(this.props.params.siteId);
  }

  render() {
    return (
      <div className="SiteDetail">
        <img src={this.props.currSite.imageUrl} />
        <h3>{this.props.currSite.name}</h3>
        <h5>{this.props.currSite.artist}</h5>
        <p>Details...</p>
        <ul>
          <li><strong>Comments</strong></li>
          <li>Comment One</li>
          <li>Comment Two</li>
        </ul>
      </div>
    );
  }
}

SiteDetail.propTypes = {
  currSite: React.PropTypes.object.isRequired,
  params: React.PropTypes.object.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
};
