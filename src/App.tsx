import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import FloatingActionBar from './components/FloatingActionBar';
import Landing from './pages/Landing';
import ThankYou from './pages/ThankYou';

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
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
