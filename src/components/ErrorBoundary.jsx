import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    // You can also log error info to an error reporting service here
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-red-600 text-center p-8 min-h-screen flex flex-col items-start justify-center">
          <h2 className="text-4xl">
            حدث خطأ برجاء تحديث الصفحة او الرجوع والدخول مرة أخري
          </h2>
          {import.meta.env.DEV && (
            <div className="w-full text-left my-4">
              <pre style={{ whiteSpace: "pre-wrap" }}>
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo && this.state.errorInfo.componentStack}
              </pre>
            </div>
          )}
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
