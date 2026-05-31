
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './Pages/LoginPage.jsx'
import { EmailPasswordProvider } from './context/EmailPasswordContext.jsx'
import HomePage from './Pages/HomePage.jsx'
import CreationJobs from './Pages/CreationJobs.jsx'
import { JobProvider } from "./context/JobContext";

function App() {


  return (


    <JobProvider>
    <EmailPasswordProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LoginPage/>}/>
         <Route path='Home' element={<HomePage/>}/>
          <Route path='CreationJobs' element={<CreationJobs/>}/>

        
      </Routes>
      </BrowserRouter>

    </EmailPasswordProvider>
    </JobProvider>
     
 
  )
}

export default App
