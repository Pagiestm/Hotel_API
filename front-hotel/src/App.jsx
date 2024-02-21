import './styles/index.scss';
import Hotel from './components/Hotel'
import DetailsRooms from './components/DetailsRooms'
import Footer from './components/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Hotel />} />
          <Route path="/room/:id" element={<DetailsRooms />} />
        </Routes>
      </Router>
      <Footer />
    </>
  )
}

export default App
