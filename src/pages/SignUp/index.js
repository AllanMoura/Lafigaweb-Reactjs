import React, {Component} from 'react';
import { Link, withRouter } from 'react-router-dom';

import api from '../../services/api';
//import Suricato from '../../assets/Suricatos.png';

import {Form, Container} from './styles';

class SignUp extends Component {
    state = {
        username: "",
        password: "",
        error: ""
    };

    handleSignUp = async e => {
        e.preventDefault();
        const {username, password} = this.state;
        if(!username || !password) {
            this.setState({error: "Preencha todos os dados cadastrais"});
        } else {
            try {
                await api.post('/user/signup', {username, password});
                this.props.history.push('/');
                console.log("Usuário cadastrado com sucesso");
                
            }catch(err) {
                console.log(err.response.data);
                if(err.response.data.errors[0].msg){
                    this.setState({error: err.response.data.errors[0].msg});
                } else{
                    this.setState({error: err.response.data.errors});
                }
            }
        }
    };

    render() {
        document.title = "Cadastro - NPCS de LAFIGA";
        return (
            <Container>
                <Form onSubmit={this.handleSignUp}>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type="text" placeholder="Nome do usuário" onChange={e => this.setState({username: e.target.value})} />
                    <input type="password" placeholder="Senha" onChange={ e => this.setState({password: e.target.value})} />
                    <button type="submit">Cadastrar Usuário</button>
                    <hr/>
                    <Link to="/">Fazer Login</Link>
                </Form>
            </Container>
        );
    }
}

export default withRouter(SignUp);