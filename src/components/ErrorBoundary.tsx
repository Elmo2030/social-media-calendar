// src/components/ErrorBoundary.tsx — Catches render errors, shows recovery UI
import { Component, type ReactNode, type ErrorInfo } from 'react';
import { tr } from '../i18n.js';

interface Props   { children: ReactNode; fallback?: ReactNode; }
interface State   { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  reset = (): void => this.setState({ hasError: false, error: null });

  render(): ReactNode {
    if (!this.state.hasError) return this.props.children;
    return this.props.fallback ?? (
      <div className="min-h-screen bg-surface-base flex items-center justify-center p-6">
        <div className="bg-surface-card rounded-xl p-8 max-w-md w-full text-center space-y-4">
          <div className="text-4xl">⚠️</div>
          <h2 className="text-xl font-bold text-white">{tr('Something went wrong')}</h2>
          <p className="text-content-muted text-sm font-mono bg-surface-base rounded p-3 text-start overflow-auto" dir="ltr">
            {this.state.error?.message ?? tr('Unknown error')}
          </p>
          <button onClick={this.reset}
            className="bg-brand hover:bg-brand-strong text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors">
            {tr('Try Again')}
          </button>
        </div>
      </div>
    );
  }
}
