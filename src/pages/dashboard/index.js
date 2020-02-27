import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import api from '../../services/api';

import {Article, Container, Strong, P, Form} from './styles';

class Dashboard extends Component {
    state = {
        npcs: [],
        pagesInfo: {},
        page: 1,
        searchquery: "",
        error: ""
    };
    //Função responsável por buscar os npcs do usuário.
    // o services api intercepta uma requisição e adiciona o token se existir
    getNpcs = async (page = 1) => {
        try {
            //Await para afirmar que só continua depois de receber o retorno, buscando npcs por página
            const response = await api.get(`/npcs?page=${page}`);
            //Usando desestruturação para buscar docs (npcs) e o restante referente a paginação
            const {docs, ...pagesInfo} = response.data
            //Setando o state, o restante do documento irá identificar a mudança e se atualizar
            this.setState({npcs: docs, pagesInfo: pagesInfo, page});
            //Não é preciso atualizar manualmente a página, a mudança da variavel state é constantemente escutada
        }catch(err) {
            console.log(err.response);
            this.setState({error: err.response.data.msg});
        }
    }

    //esta função do reactjs é executado quando a tela deste componente é carregado
    componentDidMount() {
        this.getNpcs();
    }

    nextPage = async () => {
        const {page, pagesInfo} = this.state;
        if(page === pagesInfo.pages){
            return;
        } 
        const pageNumber = page + 1;
        this.getNpcs(pageNumber);
    }

    prevPage = async () => {
        const {page} = this.state;
        if(page === 1){
            return;
        } 
        const pageNumber = page - 1;
        this.getNpcs(pageNumber);
    }

    redirectToSearch = (e) => {
        e.preventDefault();
        this.props.history.push(`/npcs/search/${this.state.searchquery}?page=${1}`);
    }

    render() {
        document.title = "Dashboard - NPCS de LAFIGA";
        return (
            <>
                <Form onSubmit={this.redirectToSearch}>
                    <input type = "text" placeholder = "Pesquisa" onChange = { e => this.setState({searchquery: e.target.value})}/>
                    <button type="submit">Pesquisar</button>
                </Form>
                <Container>
                    {
                        this.state.npcs.map(npc =>{
                            return (
                                <Article key={npc._id}>
                                    <Strong>{npc.name}, {npc.race}, {npc.occupation}</Strong>
                                    <P>{npc.location}</P>
                                    <P>{npc.description}</P>
                                    <Link to={`/npcs/${npc._id}`}>Editar</Link>
                                </Article>
                            );
                        })
                    }
                    <div className="actions">
                        <button disabled={this.state.page === 1} onClick={this.prevPage}>Anterior</button>
                        <button disabled={this.state.page === this.state.pagesInfo.pages} onClick={this.nextPage}>Proximo</button>
                    </div>
                </Container>
            </>
        );
    }
}

export default withRouter(Dashboard);