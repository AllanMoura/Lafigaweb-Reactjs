import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
import Suricato from '../../assets/Suricatos.png';
import { login, isAuthenticated } from '../../services/auth';

import {Form, Container} from './styles';

class SignIn extends Component {
    state = {
        username: "",
        password: "",
        error: ""
    };

    constructor(props){
        super(props);
        this.checkAuthentication();
    }

    checkAuthentication = async () => {
        try {
            if(isAuthenticated()){
                await api.get('/user/me');
                this.props.history.push('/dashboard');
            }
        }catch(err){
            console.log("Usuário não esta conectado");
        }
    }

    handleSignIn = async e => {
        e.preventDefault();
        const {username, password} = this.state;
        if(!username || !password){
            this.setState({ error: "Preencha username e senha para continuar" });
        } else {
            try {
                const response = await api.post("/user/login", {username, password});
                login(response.data.token);
                this.props.history.push("/dashboard");
            }catch(err){
                console.log(err.response.data);
                if(err.response.data.errors[0].msg){
                    this.setState({error: err.response.data.errors[0].msg});
                } else{
                    this.setState({error: err.response.data.errors});
                }
            }
        }
    }

    render() {
        document.title = "Login - NPCS de LAFIGA";
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <img src={Suricato} alt="Suricatos estão de olho"/>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type="text" placeholder="Nome do usuário" onChange={e => this.setState({username: e.target.value})} />
                    <input type="password" placeholder="Senha" onChange={ e => this.setState({password: e.target.value})} />
                    <button type="submit">Logar</button>
                    <hr/>
                    <Link to="/signup">Cadastrar</Link>
                </Form>
            </Container>
        );
    }
}


export default withRouter(SignIn);