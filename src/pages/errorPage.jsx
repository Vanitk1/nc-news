import { Link } from "react-router-dom"

const ErrorPage = () => {
    return (
        <main className="error-container">
            <h1 className="error-code">404</h1>
            <p className="error-text">The page you're looking for doesnt exist</p>
            <Link to="/" className="error-home"></Link>
        </main>
    )
}

export default ErrorPage