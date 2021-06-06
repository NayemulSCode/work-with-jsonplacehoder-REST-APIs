
import './App.css';
import Posts from './components/Post/Posts';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Users from './components/User/Users';
import PostDetails from './components/Post/PostDetails';
import Profile from './components/Profile/Profile';
import ProfileDetails from './components/Profile/ProfileDetails';
function App() {
  const navStyle={
    listStyle: 'none',
  }
  const linkStyle={
    textDecoration: 'none'
  }
  return (
    <Router>
       <div className="container">
        <nav className="my-3">
          <ul className="d-flex justify-content-start ">
            <li className="mx-3" style={navStyle}>
              <Link style={linkStyle} to="/">Home</Link>
            </li>
            <li className="mx-3" style={navStyle}>
              <Link style={linkStyle} to="/posts">Posts</Link>
            </li>
            <li className="mx-3" style={navStyle}>
              <Link style={linkStyle} to="/users">Users</Link>
            </li>
          </ul>
        </nav>
      </div>
      <Switch>
      <Route exact path='/'>
          <Profile />
        </Route>
        <Route path='/posts'>
          <Posts />
        </Route>
        <Route path='/post/:id'>
          <PostDetails />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/user/:id'>
          <ProfileDetails />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
