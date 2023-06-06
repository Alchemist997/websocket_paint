import React from 'react';
import Toolbar from "./components/Toolbar";
import Canvas from "./components/Canvas";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <Routes>
                    <Route path='/:id'
                        element={<>
                            <Toolbar />
                            <Canvas />
                        </>} />
                    <Route path='*' element={<Navigate to={`/${Date.now()}`} replace />} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;
