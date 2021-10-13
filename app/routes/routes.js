import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './privateRoutes';
// Import Containers
// const HomePage = React.lazy(() => import('../containers/HomePage'));

import HomePage from '../components/HomePage';
import NewHome from '../components/NewHome/pages/home';
import OmOss from '../components/OmOss';
import ThankYouPage from '../components/ThankYouPage';
import CookiePage from '../components/CookiePage';
import Layout from '../components/NewHome/components/Layout';
import SignIn from '../components/SignIn';
import Register from '../components/Register';
import Login from '../components/Login';
import ResetPass from '../components/ResetPass';
import ForgetPassEmail from '../components/ForgetPassEmail';
import ForgetPassword from '../components/ForgetPassword';
import SignUp from '../components/SignUp';
import PrintOrder from '../components/PrintOrder';
import PaymentUrl from '../components/PrintOrder/paymentUrl';
import KidsDrawing from '../components/KidsDrawing';
import AdminArea from '../components/AdminArea';
import Account from '../components/Accounts';
import MyAccount from '../components/MyAccount';
import ProfessionalDrawing from '../components/ProfessionalDrawing';
import TermsCondition from '../components/TermsCondition';
import Header from '../components/NewHome/pages/home/components/Header';
import Footer from '../components/NewHome/pages/home/components/Footer';
import KlarnaPaymentConfirmation from '../components/klarnaPaymentConfirmation';
import SwishPaymentChecker from '../components/swishPaymentChecker';
const NotFoundPage = React.lazy(() => import('../containers/NotFoundPage'));

function withLayout(WrappedComponent) {
  // ...and returns another component...
  return class extends React.Component {
    render() {
      return (
        <>
          <Header />
          <WrappedComponent />
          <Footer />
        </>
      );
    }
  };
}

const Routes = () => (
  <Suspense fallback="Loading......">
    <Switch>
      {/* <Route exact path="/old-home" component={withLayout(HomePage)} /> */}
      <Route exact path="/" component={NewHome} />
      <Route exact path="/om-oss" component={withLayout(OmOss)} />
      <Route exact path="/order-success" component={withLayout(ThankYouPage)} />
      <Route exact path="/cookie-consent" component={withLayout(CookiePage)} />
      <Route exact path="/signin" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/resetPassword" component={ResetPass} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={Register} />
      {/* <Route exact path="/print-order" component={PrintOrder} /> */}
      <Route exact path="/paymentlink/:url" component={PaymentUrl} />
      <Route
        exact
        path="/order/payment-status/:paymentRequestId"
        component={SwishPaymentChecker}
      />
      <Route exact path="/terms-and-condition" component={TermsCondition} />
      <Route
        exact
        path="/forgetPassword/:userId/:token"
        component={ForgetPassword}
      />
      <Route
        exact
        path="/sendForgetPasswordEmail"
        component={ForgetPassEmail}
      />
      <Route exact path="/kidsdrawing" component={ProfessionalDrawing} />
      <Route
        exact
        path="/professionaldrawing"
        component={ProfessionalDrawing}
      />
      <Route
        exact
        path="/drawing"
        component={ProfessionalDrawing}
      />
      <Route exact path="/klarna/confirmation" component={KlarnaPaymentConfirmation} />
      <PrivateRoute exact path="/myorders" component={AdminArea} />
      <PrivateRoute exact path="/account" component={withLayout(MyAccount)} />
      <PrivateRoute exact path="/miaccount" component={withLayout(MyAccount)} />
      {/* <PrivateRoute
        exact
        path="/professionaldrawing"
        component={ProfessionalDrawing}
      /> */}
      <Route component={NotFoundPage} />
    </Switch>
  </Suspense>
);

export default Routes;
