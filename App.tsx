
import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TrustBanner from './components/TrustBanner';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import ProfitSimulation from './components/ProfitSimulation';
import DaoGovernance from './components/DaoGovernance';
import MarketingVideo from './components/MarketingVideo';
import Roadmap from './components/Roadmap';
import MediaGallery from './components/MediaGallery';
import Whitepaper from './components/Whitepaper';
import Technical from './components/Technical';
import Footer from './components/Footer';
import AiAssistant from './components/AiAssistant';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500 selection:text-white font-serif">
      <Navbar />
      <main>
        <Hero />
        <TrustBanner />
        <About />
        <Tokenomics />
        <ProfitSimulation />
        <DaoGovernance />
        <MarketingVideo />
        <Roadmap />
        <MediaGallery />
        <Whitepaper />
        <Technical />
      </main>
      <Footer />
      <AiAssistant />
    </div>
  );
}

export default App;
