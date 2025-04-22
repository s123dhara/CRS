import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

// App Context 
import { AuthProvider } from './context/AuthContext.jsx'
import { AppWrapper } from './components/common/PageMeta.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <AuthProvider >
        <AppWrapper>
          <App />
        </AppWrapper>
      </AuthProvider>
  </StrictMode>,
)
