import React from 'react';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';

const PaperHome = (props) => {
  return (
    <Paper style={styles.paper}>
      <div style={styles.iconBox}>
        {props.icono}
      </div>
      <h4 style={styles.titulo}>{props.titulo}</h4>
      <p style={styles.textBox}>{props.texto}</p>
      <Link to={props.linkTo}>Click aquí</Link>
    </Paper>
  )
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
  titulo: {
    color: '#96B0C4',
    fontWeight: 'bold'
  },
  textBox: {
    color: '#4E5C66',
    height: 250,
    width: 'auto',
    margin: 'auto'
  }
}

export default PaperHome;