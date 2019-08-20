import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';

class PaperHome extends React.Component {
  state = {
    mostrarTodo: false
  }

  mostrarTodo = () => {
    this.setState({mostrarTodo: true})
  }

  noMostrarTodo = () => {
    this.setState({mostrarTodo: false})
  }

  render() {
    return (
      <Link style={{textDecoration: 'none'}} to={this.props.linkTo}>
      <Paper style={styles.paper} onMouseOver={this.mostrarTodo} onMouseOut={this.noMostrarTodo}>
        <div style={styles.containerTituloIcono}>
          <div style={styles.iconBox}>
            {this.props.icono}
          </div>
          <h4 style={styles.titulo}>{this.props.titulo}</h4>
        </div>
        {this.state.mostrarTodo ?
          <div>
            <p style={styles.textBox}>{this.props.texto}</p>
          </div>
        : null
        }
        {!this.state.mostrarTodo
          ? <ArrowDown style={styles.arrowDown} />
          : null
        }
      </Paper>
      </Link>
    )
  }
}

const styles = {
  paper: {
    padding: 10,
    textAlign: 'center'
  },
  iconBox: {
    height: 100,
    width: 100,
    color: '#96B0C4',
    margin: 'auto'
  },
  containerTituloIcono: {
    height: 170
  },
  titulo: {
    color: '#96B0C4',
    fontWeight: 'bold'
  },
  textBox: {
    color: '#4E5C66',
    height: '100%',
    width: 'auto',
    margin: 'auto',
    textAlign: 'center'
  },
  continuar: {
    color: '#4E5C66',
    fontSize: 30
  },
  arrowDown: {
    fontSize: 40,
    color: '#96B0C4',
    textAlign: 'center'
  }
}

export default PaperHome;