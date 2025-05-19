import React from "react"
import { Link } from "react-router-dom"

const Header = () => {
    return (
    <header className="header-container">
        <div className="container">
            <h1 className="website-title">
                <Link to="/">NC News</Link>
            </h1>
            <nav className="website-list">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <li><Link to="/create">Create</Link></li>
                    <li><Link to="/users">Users</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header