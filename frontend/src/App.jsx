import TopBar from './components/layout/TopBar.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Toast from './components/common/Toast.jsx';
import SearchModal from './components/common/SearchModal.jsx';
import AuthModal from './components/common/AuthModal.jsx';
import Hero from './components/sections/Hero.jsx';
import VideoTheatre from './components/sections/VideoTheatre.jsx';
import MemorySimulator from './components/sections/MemorySimulator.jsx';
import Practice from './components/sections/Practice.jsx';
import AiIde from './components/sections/AiIde.jsx';
import Courses from './components/sections/Courses.jsx';
import Schedule from './components/sections/Schedule.jsx';
import Campaigns from './components/sections/Campaigns.jsx';
import IronEclipse from './components/sections/IronEclipse.jsx';
import Notes from './components/sections/Notes.jsx';
import Origin from './components/sections/Origin.jsx';
import Connect from './components/sections/Connect.jsx';

export default function App() {
  return (
    <>
      <TopBar />
      <Navbar />

      <Hero />
      <VideoTheatre />
      <MemorySimulator />
      <Practice />
      <AiIde />
      <Courses />
      <Schedule />
      <Campaigns />
      <IronEclipse />
      <Notes />
      <Origin />
      <Connect />

      <Footer />

      <SearchModal />
      <AuthModal />
      <Toast />
    </>
  );
}
