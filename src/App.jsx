import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import About from './pages/About';

export default function App() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="posts" element={<PostList />} />
                <Route path="posts/:slug" element={<PostDetail />} />
                <Route path="about-us" element={<About />} />
            </Route>
        </Routes>
    );
}
