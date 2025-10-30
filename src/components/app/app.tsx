import '../../index.css';
import { BrowserRouter } from 'react-router-dom';
import { FC } from 'react';
import { AppContent } from './app-content';

const App: FC = () => (
  <BrowserRouter
    future={{
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }}
  >
    <AppContent />
  </BrowserRouter>
);

export default App;
