import { Component, type ErrorInfo, type ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

/**
 * Generic React error boundary. Catches render-time errors in any descendant
 * component tree and renders a friendly fallback UI instead of an unmounted
 * blank page. Errors are logged to the console for debugging.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <main role="alert" style={errorStyles.container}>
          <div style={errorStyles.card}>
            <h1 style={errorStyles.title}>Something went wrong</h1>
            <p style={errorStyles.message}>
              The application encountered an unexpected error. Please refresh
              the page to try again.
            </p>
          </div>
        </main>
      );
    }

    return this.props.children;
  }
}

const errorStyles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
    fontFamily:
      "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    background: '#0b1220',
    color: '#f4f6fb',
  },
  card: {
    maxWidth: '32rem',
    textAlign: 'center',
  },
  title: {
    fontSize: '2rem',
    margin: '0 0 0.75rem',
  },
  message: {
    fontSize: '1rem',
    lineHeight: 1.5,
    margin: 0,
    opacity: 0.85,
  },
};

export default ErrorBoundary;
