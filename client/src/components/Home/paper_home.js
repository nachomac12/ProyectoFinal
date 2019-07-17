import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

class PaperHome extends React.Component {
  state = {
    estilo: styles.paperhomeCorto
  }

  paperHomeLargo = () => {
    this.setState({estilo: styles.paperhomeLargo})
  }

  paperhomeCorto = () => {
    this.setState({estilo: styles.paperhomeCorto})
  }

  render() {
    return (
      <Paper style={styles.paper} onPointerOver={this.paperHomeLargo} onPointerOut={this.paperhomeCorto}>
        <div style={this.state.estilo}>
          <div style={styles.iconBox}>
            {this.props.icono}
          </div>
          <h4 style={styles.titulo}>{this.props.titulo}</h4>
          <p style={styles.textBox}>{this.props.texto}</p>
          <div style={{marginTop: 10}}><Link to={this.props.linkTo}>Click aquí</Link></div>
        </div>
        {this.state.estilo === styles.paperhomeCorto
          ? <p style={styles.continuar}>...</p>
          : null
        }
      </Paper>
    )
  }
}

const styles = {
  paper: {
    padding: 10,
    textAlign: 'center'
  },
  paperhomeCorto: {
    height: 250,
    width: 'auto',
    overflow: 'scroll',
    overflowX: 'hidden',
    overflowY: 'hidden'
  },
  paperhomeLargo: {
    height: '100%',
    width: 'auto'
  },
  iconBox: {
    height: 100,
    width: 100,
    color: '#96B0C4',
    margin: 'auto'
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
  }
}

export default PaperHome;