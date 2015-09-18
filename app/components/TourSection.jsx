import React from 'react';
import {RouteHandler} from 'react-router';
import Modal from 'react-modal';
import FilterSection from './FilterSection';
import SearchSection from './SearchSection';
import {getLocation} from '../utils/geo';

// styles
import '../styles/components/TourSection';

const appElement = document.getElementById('app');

Modal.setAppElement(appElement);
Modal.injectCSS();

export default class TourSection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      modalContent: false,
    };

    this.siteDetailClick = this.siteDetailClick.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    this.renderTopBar();
  }

  componentDidMount() {
    getLocation().then(this.props.getSites);
    this.props.getCurrSite(this.props.params.siteId);
  }

  siteDetailClick(event) {
    const router = this.context.router;
    router.transitionTo('tours-detail', { siteId: event.target.dataset.route });
  }

  openModal(modalContent) {
    if (modalContent === 'filter') {
      this.setState({modalContent: <FilterSection doFilterSearch={this.props.doFilterSearch} closeModal={this.closeModal}/>});
    } else {
      this.setState({modalContent: <SearchSection doSearch={this.props.doSearch} closeModal={this.closeModal} />});
    }
    this.setState({modalIsOpen: true});
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  renderTopBar() {
    const path = this.props.path;
    const pathArr = path.split('/');

    // tours/:tourId
    if (pathArr[1] === 'tours' && pathArr[2] !== 'map' && this.props.params.tourId) {
      this.props.setTopBar({
        title: this.props.currTour.title,
        leftBtn: {
          name: 'Tours',
          route: 'tours',
        },
        rightBtn: {
          name: 'Map',
          route: `/tours/map/${this.props.params.tourId}`,
        },
      });
    }

    // tours/map/:tourId
    if (pathArr[1] === 'tours' && pathArr[2] === 'map' && this.props.params.tourId) {
      this.props.setTopBar({
        title: this.props.currTour.title,
        leftBtn: {
          name: 'Tours',
          route: 'tours',
        },
        rightBtn: {
          name: 'Details',
          route: `/tours/${this.props.params.tourId}`,
        },
      });
    }

    // tours/
    if (pathArr[1] === 'tours') {
      this.props.setTopBar({
        title: 'Tours',
        leftBtn: {
          name: 'Filter',
          click: this.openModal.bind(this, 'filter'),
        },
        rightBtn: {
          name: 'Map',
          route: '/tours/map',
        },
        bottomBtn: {
          name: 'Search',
          click: this.openModal,
        },
      });
    }
  }

  render() {
    return (
      <div className="TourSection">
        <RouteHandler
          {...this.state}
          {...this.props}
        />
      {this.props.tours.length ? null : this.props.nearbyToursLoader}
        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}
        >
          {this.state.modalContent}
        </Modal>
      </div>
    );
  }
}

TourSection.propTypes = {
  setTopBar: React.PropTypes.func.isRequired,
  getSites: React.PropTypes.func.isRequired,
  sites: React.PropTypes.array.isRequired,
  getCurrSite: React.PropTypes.func.isRequired,
  doSearch: React.PropTypes.func.isRequired,
  doFilterSearch: React.PropTypes.func.isRequired,
  params: React.PropTypes.object.isRequired,
  currTour: React.PropTypes.object,
  path: React.PropTypes.string,
  tours: React.PropTypes.array,
  nearbyToursLoader: React.PropTypes.node,
};
