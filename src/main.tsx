import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './redux/store';
import { Provider } from 'react-redux';

// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  // </StrictMode>,
)
