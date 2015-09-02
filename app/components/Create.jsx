import React from 'react';

class CreateSite extends React.Component {
  _handleSubmit() {
    const router = this.context.router;
    router.transitionTo('Tour');
  }
  render() {
    return (
      <div>
        <form onSubmit={this._handleSubmit.bind(this)}>
          <input type="text" />
          <input type="submit" />
        </form>
      </div>
    );
  }
}

CreateSite.contextTypes = {
  router: React.PropTypes.func.isRequired,
};

export default CreateSite;
