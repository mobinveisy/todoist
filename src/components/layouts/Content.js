import React from 'react';
import Sidebar from "./Sidebar";
import './Content.css';
import Tasks from "../Tasks";

const Content = () => {
    return (
        <div className="content">
            <Sidebar/>
            <Tasks/>
        </div>
    );
}


export default Content;