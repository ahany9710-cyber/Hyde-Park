import Footer from './components/Footer';
import FloatingActionBar from './components/FloatingActionBar';
import Landing from './pages/Landing';

const TownsideHome = () => {
  return (
    <div className="min-h-screen bg-white pb-20 md:pb-0">
      <Landing />
      <Footer />
      <FloatingActionBar />
    </div>
  );
};

export default TownsideHome;
