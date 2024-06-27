import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Main from '../Pages/Main/Main';
import Round from '../Pages/Round/Round';

function AppRouter() {
    return (
        <BrowserRouter basename={"/"}>
            <Routes>
                <Route path="/" element={<Main/>}></Route>
                <Route path="/round" element={<Round/>}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter