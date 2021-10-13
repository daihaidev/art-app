import React, { Component, Suspense } from 'react';
import { Route, Switch, BrowserRouter as Router, withRouter } from 'react-router-dom';
import Layout from './components/Layout';

// Import Css
import './Apps.scss';
import './assets/css/materialdesignicons.min.css';
import './assets/css/colors/default.css';

// Include Routes
import routes from './routes';

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return (
        <Layout>
          <WrappedComponent />
        </Layout>
      );
    }
  };
}

class App extends Component {
  Loader = () => (
    <div id="preloader">
      <div id="status">
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      </div>
    </div>
  )
  render() {
    return (
      <React.Fragment>
        <Router>
          <Suspense fallback={this.Loader()} >
            <Switch>
              {routes.map((route, idx) =>
                !route.isWithoutLayout ? ( // temp
                  <Route
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    key={idx}
                  />
                ) :
                  <Route
                    path={route.path}
                    exact
                    component={withLayout(route.component)}
                    key={idx}
                  />

              )}
            </Switch>
          </Suspense>
        </Router>
      </React.Fragment>
    );
  }
}

export default withRouter(App);
