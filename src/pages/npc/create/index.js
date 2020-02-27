import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import api from '../../../services/api';

import {Container, Form} from './styles';

class CreateNpc extends Component {

    state = {
        name: "",
        race: "",
        occupation: "",
        location: "",
        description: "",
        error: ""
    }

    create = async (e) => {
        e.preventDefault();
        let {name, race, occupation, location, description} = this.state;
        if (!name) {
            this.setState({error: "Insira ao menos o nome do NPC"});
        } else {
            if(!race) race =  "Raça desconhecida";
            if(!occupation) occupation = "Profissão desconhecida";
            if(!location) location = "Localização desconhecida";
            try {
                api.post('/npcs', {name, race, occupation, location, description});
                this.setState({name: "", race: "", occupation: "", location: "", description: "", error: ""});
                alert("NPC cadastrado com sucesso");

            } catch (err) {
                console.log(err);
                if(err.response.data.errors[0].msg){
                    this.setState({error: err.response.data.errors[0].msg});
                } else{
                    this.setState({error: err.response.data.errors});
                }
                
            }
        }
    }

    render() {
        const {name, race, occupation, location, description} = this.state;
        document.title = "Criar NPC - NPCS de LAFIGA";
        return (
            <>
               
                <Container>
                    <Form onSubmit={this.create}>
                        <strong>Insira os dados do NPC</strong>
                        {this.state.error && <p>{this.state.error}</p>}
                        <input type = "text" value={name} placeholder = "Nome" onChange = { e => this.setState({name: e.target.value})} />
                        <input type = "text" value={race} placeholder = "Raça" onChange = { e => this.setState({race: e.target.value})} />
                        <input type = "text" value={occupation} placeholder = "Profissão" onChange = { e => this.setState({occupation: e.target.value})} />
                        <input type = "text" value={location} placeholder = "Localização" onChange = { e => this.setState({location: e.target.value})} />
                        <textarea value={description} rows = "3" cols = "40" placeholder = "Descrições extras" onChange = { e => this.setState({description: e.target.value})} />
                        <button type="submit">Cadastrar NPC</button>
                        <hr/>
                        <Link to="/dashboard">Lista de NPCS</Link>
                    </Form>
                </Container>

            </>
        );
    }
}

export default withRouter(CreateNpc);