
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
  return (
    <Router>
       <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Posts</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            <li>
              <Link to="/user/:id">Profile</Link>
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
