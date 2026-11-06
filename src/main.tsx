import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
import './pop-themes.css';

document.documentElement.lang=/^(en)(-|$)/i.test(navigator.languages?.find(language=>/^(es|en)(-|$)/i.test(language))||navigator.language||'')?'en':'es';

type BoundaryState = { error: Error | null };
class RootErrorBoundary extends React.Component<{ children: React.ReactNode }, BoundaryState> {
  state: BoundaryState = { error: null };
  static getDerivedStateFromError(error: Error): BoundaryState { return { error }; }
  componentDidCatch(error: Error) { console.error('Tsukikage UI error', error); }
  render() {
    if (this.state.error) return <main className="fatal-screen"><img src={`${import.meta.env.BASE_URL}tsukikage-mark.svg`} alt=""/><h1>Tsukikage tuvo un problema al abrir esta vista</h1><p>El guardado local sigue intacto. Recarga la app para volver a intentarlo.</p><details><summary>Detalles para diagnosticar</summary><pre>{this.state.error.message}</pre></details><button onClick={() => window.location.reload()}>Recargar Tsukikage</button></main>;
    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(<React.StrictMode><RootErrorBoundary><App /></RootErrorBoundary></React.StrictMode>);
if (import.meta.env.PROD && 'serviceWorker' in navigator) window.addEventListener('load', () => void navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(error=>console.warn('Offline installation unavailable',error)));
