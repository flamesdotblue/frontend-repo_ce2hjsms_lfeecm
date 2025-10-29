import React from 'react';
import Hero from './components/Hero';
import FeatureGrid from './components/FeatureGrid';
import AuthPortal from './components/AuthPortal';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-black selection:bg-fuchsia-500/40 selection:text-white">
      <Hero />
      <FeatureGrid />
      <AuthPortal />
      <Footer />
    </div>
  );
}

export default App;
