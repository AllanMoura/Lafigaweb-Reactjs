import React, {Component} from 'react';
import {withRouter, Link} from 'react-router-dom'
import api from '../../services/api';
import {logout} from '../../services/auth'

import { Headerr } from './styles'

class Header extends Component {
    
    state = {
        username:"",
        error:""
    }

    DesconnectUser = () => {
        logout();
        this.props.history.push('/');
    }

    getUser = async () => {
        try{
            const response = await api.get('/user/me');
            this.setState({username: response.data.username});
        }catch(err){
            console.log(err.response);
            this.setState({error: err.response.data.msg});
        }
        
    }

    componentDidMount(){
        this.getUser();
    }

    render(){
        return (
            <Headerr>
                <p>{this.state.username}</p>
                <p id="toDashboard" onClick={() => this.props.history.push('/dashboard')}>NPCS de LAFIGA</p>
                <Link to={'/npc/create'}>Adicionar NPC</Link>
                <button onClick={this.DesconnectUser}>Deslogar</button>
            </Headerr>
        );
    }
}

export default withRouter(Header);
