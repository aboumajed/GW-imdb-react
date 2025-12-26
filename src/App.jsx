import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Search from './pages/Search';
import MovieDetails from './pages/MovieDetails';
import RecentMovies from './pages/RecentMovies';

function App() {
  return (
    <div className="app">
      <Header />
      <div className="app-body">
        <Sidebar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route path="/search" element={<Search />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/recent" element={<RecentMovies />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default App;
