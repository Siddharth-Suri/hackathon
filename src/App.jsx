import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { TopBar } from "./components/TopBar";
import { RecoilRoot } from "recoil";

function App() {
    return (
        <div>
            <RecoilRoot>
                <TopBar></TopBar>
            </RecoilRoot>
        </div>
    );
}

export default App;
