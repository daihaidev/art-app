/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import NotFoundPage from '../NotFoundPage';
import ErrorBoundary from '../../components/ErrorBoundary/errorBoundary';

export default function HomePage() {
  return (
    <h1>
      <FormattedMessage {...messages.header} />
      <ErrorBoundary>
        <NotFoundPage />
      </ErrorBoundary>
    </h1>
  );
}
