import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import {Container, Form} from './styles';
import api from '../../../services/api';

class EditNpc extends Component {

    state = {
        npc: {
            _id: "",
            name: "",
            race: "",
            occupation: "",
            location: "",
            description: "",
        },

        error: ""
    };

    async componentDidMount() {
        const { id } = this.props.match.params;

        try {
            const response = await api.get(`/npcs/${id}`);
            this.setState({npc: response.data});
        } catch (err) {
            if(!err.response.data.errors) {
                this.props.history.push('/dashboard');
            } else if(err.response.data.errors[0].msg){
                this.setState({error: err.response.data.errors[0].msg});
            } else{
                this.setState({error: err.response.data.errors});
            }
        }
    }

    edit = async (e) => {
        e.preventDefault();
        let {name, race, occupation, location, description} = this.state.npc;
        
        if (!name) {
            this.setState({error: "Insira ao menos o nome do NPC"});
        } else {
            if(!race) race =  "Raça desconhecida";
            if(!occupation) occupation = "Profissão desconhecida";
            if(!location) location = "Localização desconhecida";
            try {
                const { id } = this.props.match.params;
                api.put(`/npcs/${id}`, {name, race, occupation, location, description});
                alert("NPC Editado com sucesso");

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

    removeNpc = async () => {
        console.log("deletar");
        const { id } = this.props.match.params;
        try {
            await api.delete(`/npcs/${id}`);
            alert("NPC deletado com sucesso")
            this.props.history.push('/dashboard');
        } catch (err) {
            console.log(err);
            console.log("Problema ao deletar personagem")
        }
    }
    render() {
        const { npc } = this.state;
        document.title = "Editar NPC - NPCS de LAFIGA";
        return (
            <Container>
                <Form onSubmit={this.edit}>
                    <strong>Edite os dados do NPC</strong>
                    {this.state.error && <p>{this.state.error}</p>}
                    <input type = "text" placeholder = "Nome" value = { npc.name } onChange = { event => this.setState({ npc: {...npc, name: event.target.value }})} />
                    <input type = "text" placeholder = "race" value = { npc.race } onChange = { event => this.setState({ npc: {...npc, race: event.target.value }})} />
                    <input type = "text" placeholder = "Profissão" value = { npc.occupation } onChange = { event => this.setState({npc: {...npc, occupation: event.target.value}})} />
                    <input type = "text" placeholder = "localização" value = { npc.location } onChange = { event => this.setState({npc: { ...npc, location: event.target.value}})} />
                    <textarea rows = "3" cols = "40" placeholder = "Descrições extras" value = { npc.description } onChange = { event => this.setState({npc: { ...npc, description: event.target.value}})} />
                    <button type="submit">Editar NPC</button>
                    <hr/>
                    <Link to="/dashboard">Lista de NPCS</Link>
                    <button type = "button" id="remove" onClick={this.removeNpc}>Deletar NPC</button>
                </Form>
            </Container>
        );
    }
}

export default withRouter(EditNpc);