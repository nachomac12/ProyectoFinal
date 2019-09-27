import React, { Component } from 'react';
import EmpleoItem from './empleo_item';
import { connect } from 'react-redux';
import { listarTrabajosEmpleador } from '../../../redux/actions/trabajo_actions';
import InfoEmpleo from './info_empleo';

class GestionEmpleos extends Component {
  state = {
    loading: true,
    candidatos: [],
    titulo: ""
  }
  
  componentDidMount() {
    return this.props.dispatch(listarTrabajosEmpleador())
      .then(() => {
        this.setState({
          loading: false
        })
      })
  }

  renderCandidatos = (item) => {
    var candidatos = [];
    item.candidatos.map(c => candidatos.push(c));
    this.setState({candidatos, titulo: item.titulo});
  }

  renderEmpleoItem = () => {
    if (!this.state.loading) {
      return this.props.trabajo.trabajosEmpleador.map((item, i) => (
        <div onClick={() => this.renderCandidatos(item)}>
          <EmpleoItem
            titulo={item.titulo}
            numero={i}
            key={i}
          />
        </div>
      ))
    }
  }

  render() {
    return (
      <div style={{padding: 20}}>
        <div className="row">
          <div className="col-md-5">
            {this.renderEmpleoItem()}
          </div>
          <div className="col-md">
            <InfoEmpleo candidatos={this.state.candidatos} titulo={this.state.titulo}/>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    trabajo: state.trabajo
  }
}

export default connect(mapStateToProps)(GestionEmpleos);