import React from 'react';
import Router from 'react-router';
import routes from './config/routes';
import './styles/main';



// class App extends React.Component {
//   render() {
//     return (
//       <div className="container">
//         Hello
//       </div>
//     );
//   }
// }

Router.run(routes, (Root, state) => {
  React.render(<Root {...state} />, document.getElementById('app'));
});

// React.render(
//   <App />,
//   document.getElementById('app')
// );
