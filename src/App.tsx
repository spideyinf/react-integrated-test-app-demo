import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import HomePage from './pages/HomePage';
import SharePage from './pages/SharePage';

function App() {
  return (
    <React.Suspense fallback={null}>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/share" element={<SharePage />} />
        </Routes>
      </Layout>
    </React.Suspense>
  );
}

export default App;
