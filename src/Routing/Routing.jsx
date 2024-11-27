import React from 'react'
import { BrowserRouter ,Route,Routes} from 'react-router-dom'
import Home from '../Pages/Home'
import VideoDetail from '../Pages/Video'
import Header from '../Layout/Header/Header'


const Routing = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/video/:id" element={<VideoDetail />} />
      </Routes>
      
    </BrowserRouter>
  )
}

export default Routing
