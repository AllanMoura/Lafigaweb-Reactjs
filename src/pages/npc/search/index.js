import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import api from '../../../services/api';

import {Article, Container, Strong, P, Form} from './styles';

class Search extends Component {
    state = {
        npcs: [],
        pagesInfo: {},
        page: 1,
        searchquery: "",
        newsearchquery: "",
        error: ""
    }

    getSearch = async (page = 1, searchquery) => {
        try {
            //Await para afirmar que só continua depois de receber o retorno, buscando npcs por página
            const response = await api.post(`/npcs/search?page=${page}`, {searchquery: searchquery});
            console.log(response);
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

    componentDidMount() {
        const { searchquery } = this.props.match.params;
        this.setState({searchquery: searchquery, newsearchquery: searchquery});
        this.getSearch(1, searchquery);
    }

    nextPage = async () => {
        const {page, pagesInfo} = this.state;
        if(page === pagesInfo.pages){
            return;
        } 
        const pageNumber = page + 1;
        this.getSearch(pageNumber, this.state.searchquery);
    }

    prevPage = async () => {
        const {page} = this.state;
        if(page === 1){
            return;
        } 
        const pageNumber = page - 1;
        this.getSearch(pageNumber, this.state.searchquery);
    }

    redirectToSearch = (e) => {
        this.props.history.push(`/npcs/search/${this.state.newsearchquery}?page=${1}`);
    }

    render() {
        document.title = "Pesquisar NPC - NPCS de LAFIGA";
        return (
            <>
                <Form onSubmit = {this.redirectToSearch}>
                    <input type = "text" placeholder = "Pesquisa" value ={this.state.newsearchquery}  onChange = { e => this.setState({newsearchquery: e.target.value})}/>
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


export default withRouter(Search);