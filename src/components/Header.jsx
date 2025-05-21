import { Link } from "react-router-dom"

const Header = () => {
    return (
    <header className="header-container">
        <div className="container">
            <h1 className="website-title">NC News</h1>
            <nav className="website-list">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <li><Link to="/create">Post Article</Link></li>
                </ul>
            </nav>
        </div>
    </header>
    )
}

export default Header