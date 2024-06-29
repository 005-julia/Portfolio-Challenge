import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import VideoDetail from './pages/VideoDetail';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/video/:id" component={VideoDetail} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <h1>AluraFlix</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
    </header>
  );
}

export default Header;
import React from 'react';

function Footer() {
  return (
    <footer>
      <p>&copy; 2024 AluraFlix</p>
    </footer>
  );
}

export default Footer;
import React from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  return (
    <div className="video-card">
      <Link to={`/video/${video.id}`}>
        <img src={video.thumbnail} alt={video.title} />
        <h3>{video.title}</h3>
      </Link>
    </div>
  );
}

export default VideoCard;
import React from 'react';
import VideoCard from './VideoCard';

function VideoList({ videos }) {
  return (
    <div className="video-list">
      {videos.map(video => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
import React, { useState, useEffect } from 'react';
import VideoList from '../components/VideoList';

const videos = [
  { id: 1, title: 'Video 1', thumbnail: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Video 2', thumbnail: 'https://via.placeholder.com/150' },
  // Add more videos here
];

function Home() {
  const [videoData, setVideoData] = useState([]);

  useEffect(() => {
    // In a real application, you would fetch data from an API
    setVideoData(videos);
  }, []);

  return (
    <div>
      <h2>Featured Videos</h2>
      <VideoList videos={videoData} />
    </div>
  );
}

export default Home;
import React from 'react';
import { useParams } from 'react-router-dom';

const videoData = [
  { id: 1, title: 'Video 1', description: 'Description of Video 1', url: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Video 2', description: 'Description of Video 2', url: 'https://via.placeholder.com/150' },
  // Add more videos here
];

function VideoDetail() {
  const { id } = useParams();
  const video = videoData.find(video => video.id === parseInt(id));

  if (!video) {
    return <div>Video not found</div>;
  }

  return (
    <div>
      <h2>{video.title}</h2>
      <p>{video.description}</p>
      <video src={video.url} controls></video>
    </div>
  );
}

export default VideoDetail;
import React from 'react';
import ReactDOM from 'react-dom';
import './styles.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
