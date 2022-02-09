import { BrowserRouter, Routes, Route } from "react-router-dom";
import Default from './style';
import 

export default function Router(){
    return(
        <BrowserRouter>
            <Default />
            <Background>
                <Routes>
                    <Route path="/" element={<h1>oi</h1>} />
                </Routes>
            </Background>
        </BrowserRouter>
    );
}