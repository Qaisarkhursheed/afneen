import React from 'react';
import ErrorShow from '../../pages/NoData/ErrorShow';

class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }
  
    componentDidCatch(error, info) {
      // Display fallback UI
      this.setState({ hasError: true });
      // You can also log the error to an error reporting service
      console.log(error, info);
    }
  
    render() {
      if (this.state.hasError) {
        return <ErrorShow />
      }
      return this.props.children;
    }
  }

export default ErrorBoundary;
