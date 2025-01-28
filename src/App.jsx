import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { TopBar } from "./components/TopBar";
import { RecoilRoot } from "recoil";
import ChatBot from "./components/ChatBot";
import { LandingPage } from "./components/LandingPage";
function App() {
    return (
        <RecoilRoot>
            <BrowserRouter>
                <TopBar></TopBar>
                <Routes>
                    <Route
                        path="/"
                        element={<LandingPage></LandingPage>}
                    ></Route>
                    <Route path="/pose" element={<Home></Home>}></Route>
                    <Route
                        path="/questions"
                        element={<ChatBot></ChatBot>}
                    ></Route>
                </Routes>
            </BrowserRouter>
        </RecoilRoot>
    );
}

export default App;
