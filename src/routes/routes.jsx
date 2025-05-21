import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/homepage"
import ArticlePage from "../pages/articlespage"
// import Createpage from "../pages/createPage"
import ErrorPage from "../pages/errorPage"
import Topicspage from "../pages/topicsPage"

const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="articles/:article_id" element={<ArticlePage/>}/>
            <Route path="topics" element={<Topicspage/>}/>
            <Route path="topics/:slug" element={<Topicspage />} />
            <Route path="*" element={<ErrorPage/>}/>
        </Routes>
    )
}

export default AllRoutes