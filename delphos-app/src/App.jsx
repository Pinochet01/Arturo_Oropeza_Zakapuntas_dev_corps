import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import EcologicalPage from './ecological/EcologicalPage';
import ConstruccionPage from './construccion/ConstruccionPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ecological" element={<EcologicalPage />} />
        <Route path="/construccion" element={<ConstruccionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;