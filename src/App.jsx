
import LoginPage from './Pages/LoginPage.jsx'
import { EmailPasswordProvider } from './context/EmailPasswordContext.jsx'

function App() {


  return (
 
    <EmailPasswordProvider>
<LoginPage/>
    </EmailPasswordProvider>
     
 
  )
}

export default App
