import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

class Registration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            login: '',
            password: ''
        }
    }

    onSignUp = (e) => {
        e.preventDefault();
        let user = {
            username: this.state.username,
            login: this.state.login,
            password: this.state.password
        };
        axios.defaults.baseURL = this.props.serverIp;
        axios.post('/signUp', user)
            .then((res) => {
                // this.props.ma
                console.log(res.data);
                this.props.history.push('/rooms');
        });
    }

    onUsernameChanged = (e) => {
        this.setState({username: e.target.value});
    }

    onLoginChanged = (e) => {
        this.setState({login: e.target.value});
    }

    onPasswordChanged = (e) => {
        this.setState({password: e.target.value});
    }

    render() {
        return (
            <form onSubmit={this.onSignUp}>
                <input onChange={this.onUsernameChanged} name="username" placeholder="Username"/>
                <input onChange={this.onLoginChanged} name="login" placeholder="Login"/>
                <input onChange={this.onPasswordChanged} name="password" type="password" placeholder="Password"/>
                <input type="submit" value="Sign Up"/>
            </form>
        )
    }
}
const mapStateToProps = (state) => ({
    serverIp: state.serverIp
});

export default connect(
    mapStateToProps,
    null
)(Registration);