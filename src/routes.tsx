import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from './style';
import { Background } from './components/Background';
import Game from './Pages/Game';

export default function Router() {
    return (
        <>
            <Background />
            <BrowserRouter>
                <Default />
                <Routes>
                    <Route path="/" element={<Game />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}