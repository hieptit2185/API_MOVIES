import React, { Fragment } from 'react'
import UserPage from './components/users/UserPage'
import Login from './components/Login/LoginPage'
import Home from './components/Layout/LayoutContainer'
import Movies from './components/Movies/MoviesPage'
import Lists from './components/Lists/ListsPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from './components/Home/HomePage'
import CreateMovie from './components/Movies/CreateMovie'

function App() {
  const routers = [
    {
      path: '/',
      component: Login,
      layout: true,
    },
    {
      path: '/users',
      component: UserPage
    },
    {
      path: '/movies',
      component: Movies
    },
    {
      path: '/lists',
      component: Lists
    },
    {
      path: '/home',
      component: HomePage
    },
    {
      path: '/movies/new',
      component: CreateMovie
    },

  ]
  // const isAdmin = JSON.parse(localStorage.getItem('user')).isAdmin
  return (
    <Router>
      <div className="App">
        <Routes>
          {
            routers.length && routers.map((item, index) => {
              const Page = item.component
              const Layout = item.layout ? Fragment : Home
              return <Route
                key={index}
                path={item.path}
                exact
                element={
                  <Layout >
                    <Page />
                  </Layout>} />
            })
          }
        </Routes>
      </div>
    </Router>
  )
}

export default App;

