import React from 'react';
import Spline from '@splinetool/react-spline';

const SplineBackground = () => {
  return (
    <div className="fixed inset-0">
      <Spline scene="https://prod.spline.design/kQvG7wlO1TflLQkC/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-fuchsia-500/30 blur-3xl" />
        <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-500/30 blur-3xl" />
      </div>
    </div>
  );
};

export default SplineBackground;
