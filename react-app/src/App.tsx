import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './components/page/home/Home'
import WorldClockApp from './components/page/world-clock-app/WorldClockApp'
import MemoApp from './components/page/memo-app/MemoApp'
import LoginMemoApp from './components/page/memo-app/LoginMemoApp'
import GenerateCardApp from './components/page/generate-card-app/GenerateCardApp'


function App() {
  return (
    <Layout>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world-clock-app/" element={<WorldClockApp />} />
        <Route path="/memo-app/" element={<MemoApp />} />
        <Route path="/memo-app/login/" element={<LoginMemoApp />} />
        <Route path="/generate-card-app/" element={<GenerateCardApp />} />
      </Routes>

    </Layout>
  );
}

export default App;
