import React, { Component, PropTypes } from 'react';

class componentName extends Component {

  render() {
    return (
      <React.Fragment>
        <div class="section text-center">
          <h1 class="display-3">Thank You!</h1>
          <h2 class="display-5 text-success">Your order has been placed</h2>
          <p class="lead"><strong>Please check your email</strong> for further information about your order</p>
          <hr />
          {/* <p>
            Having trouble? <a href="">Contact us</a>
          </p> */}
          <p class="lead">
            <a class="btn btn-primary btn-lg btn-green" href="/" role="button">Continue to homepage</a>
          </p>
        </div>
      </React.Fragment>

    );
  }
}


export default componentName;
