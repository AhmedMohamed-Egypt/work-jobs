
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import { EmailPasswordProvider } from './context/EmailPasswordContext.jsx'
import HomePage from './Pages/HomePage.jsx'
import CreationJobs from './Pages/CreationJobs.jsx'

function App() {


  return (


 
    <EmailPasswordProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
         <Route path='Home' element={<HomePage/>}/>
          <Route path='CreationJobs' element={<CreationJobs/>}/>

        
      </Routes>
      </BrowserRouter>

    </EmailPasswordProvider>
     
 
  )
}

export default App
