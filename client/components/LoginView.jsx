class LoginView extends React.Component {

  constructor (props) {
    super(props);

    this.state = {
      authenticated: null
    }

    this.serverRequest = function ajax(url, data) {
      // If second parameter is empty function performs a GET request
      var method = data === undefined ? 'GET' : 'POST';
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        method: method,
        body: JSON.stringify(data)
      })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.authenticated) {
          window.user = data.username;
          window.location.hash = 'landing';
        } else {
          this.setState({
            authenticated: false
          })
        }
      })
      .catch(err => {
        console.log(err);
      });
    }.bind(this);

    this.submitLogin = event => {
      event.preventDefault();

      let username = document.getElementById('username').value;
      let password = document.getElementById('password').value;
      var data = {
        username: username,
        password: password
      };
      this.serverRequest('http://localhost:3000/classes/login', data);
    };

    this.logout = event => {
      console.log('logging out');
      this.serverRequest('http://localhost:3000/classes/logout');
    }

  }

  render() {
    return (
      <div className="container centerText">
        <form id="myForm" className="form-login" onSubmit={this.submitLogin}>
          <h2>Login</h2>
          <input name="username" id="username" className="form-control" type="text" placeholder="Username"/>
          <input name="password" id="password" className="form-control" type="password" placeholder="Password"/>
          <button className="btn btn-success btn-block" type="submit" value="Save">Login</button>
          <p className={this.state.authenticated === false ? '' : 'hide'}> Incorrect username or password </p>
        </form>
      </div>
    );
  };
}
