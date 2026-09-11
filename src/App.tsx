import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import FloatingActionBar from './components/FloatingActionBar';
import Landing from './pages/Landing';
import ThankYou from './pages/ThankYou';
import MV11Landing from './pages/mv11/MV11Landing';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="min-h-screen bg-white pb-24 md:pb-0">
              <Landing />
              <Footer />
              <FloatingActionBar />
            </div>
          }
        />
        <Route path="/mv-1-1" element={<MV11Landing />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
