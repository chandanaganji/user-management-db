import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false }; // Initialize error state
  }

  // Lifecycle method to update state if an error is encountered
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Capture error details and log them (could send to a logging service)
  componentDidCatch(error, info) {
    console.error("Error caught in ErrorBoundary:", error, info);
  }

  render() {
    // Display fallback UI if an error occurred
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }

    // Render children components if no error
    return this.props.children;
  }
}

export default ErrorBoundary;
