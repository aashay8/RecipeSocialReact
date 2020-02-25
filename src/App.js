import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { Layout } from 'antd';
import './CSS/App.css';
import WrappedNormalLoginForm from './Login'
import './CSS/Login.css'
import RegistrationForm from './Register'
import WrappedNormalAuthenticationForm from './MailAuthentication'
import RecipeGrid from './RecipeGrid';

const { Content } = Layout;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      navLink: 0,
      userName: '',
      likes: '',
      dislikes: '',
      favourites: '',
      userIdSearched: null
    }
  }

  handleLogin = (loginResult, emailID) => {
    console.log(`Login Result: ${JSON.stringify(loginResult)}`)
    if (loginResult.message === 'Successful login') {
      let { userName, likes, dislikes, favourites } = loginResult.data;
      localStorage.setItem('login', JSON.stringify({
        token: loginResult.data.token,
        loggedIn: true,
        emailID: emailID,
        userName: userName,
        likes: likes,
        dislikes: dislikes,
        favourites: favourites
      }))
      this.setState({
        loggedIn: true
      });
    }
    else {
      alert(loginResult.message);
    }
  }

  render() {
    return (
      <div className="App">
        <div className='container'>
          <Content>
            <Router>
              <Switch>
                {/* <Route path='/login' component={WrappedNormalLoginForm} /> */}
                <Route path='/login'
                  render={(props) => <WrappedNormalLoginForm {...props} loginFunction={this.handleLogin} loggedIn={this.state.loggedIn} />} />
                <Route path='/register' component={RegistrationForm} />
                <Route path='/authenticate' component={WrappedNormalAuthenticationForm} />
                <Route path='/RecipeHome' exact render={(props) => <RecipeGrid {...props} key="all"
                />} />
                <Route path='/RecipeHome/:friendID' exact render={(props) => <RecipeGrid {...props} key="all" />} />
              </Switch>
            </Router>
          </Content>
        </div>
      </div>
    );
  }
}

export default App;
