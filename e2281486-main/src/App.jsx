import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./Home";
import { NoMatch } from "./NoMatch.jsx";
import Detail from "./detail.jsx";
import Season from "./Season.jsx";
import JouerEpisode from "./JouerEpisode.jsx";
import { Navbar } from "./NavBar.jsx";
import { AuthProvider } from "./AuthContext.jsx";
import Login from "./Login.jsx";
import History from "./History.jsx";


export function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar role="navigation" />
                <Routes aria-live="polite">
                    <Route path="/" element={<Home />} aria-label="Home page" />
                    <Route path="*" element={<NoMatch />} aria-label="Page not found" />
                    <Route path="/login" element={<Login />} aria-label="Login page" />
                    <Route path="/detail/:tvshowId" element={<Detail />} aria-label="TV Show detail page" />
                    <Route path="/season/:seasonId" element={<Season />} aria-label="Season detail page" />
                    <Route path="/History" element={<History />} aria-label="History page" />
                    <Route path="/playepisode/:episodeId" element={<JouerEpisode />} aria-label="Episode player page" />
                </Routes>
                <footer className="footer" style={{backgroundColor: "white"}} role="contentinfo">
                    <div className="container">
                        <div className="content has-text-centered">
                            <p>e2281486</p>
                        </div>
                    </div>
                </footer>
            </BrowserRouter>
        </AuthProvider>
    );
}
