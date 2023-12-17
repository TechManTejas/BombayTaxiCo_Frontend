import ReactDOM from 'react-dom/client'
import { MyContextProvider } from './context/context.prover.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <MyContextProvider>
    <App />
  </MyContextProvider>,
)
