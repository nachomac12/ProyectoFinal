import React from 'react';
import Paper from '@material-ui/core/Paper';

const PaperPerfil = (props) => {

    const listar = (lista) => {
        return lista.map((item, i) => {
          if (i < lista.length-1) {
            return <span key={i}>{`${item}, `}</span>
          } else {
            return <span key={i}>{`${item}.`}</span>
          }
        })
      }

    return (
        <Paper className="text-center" style={{padding: '20px', marginBottom: 10}}>
            <h4>{props.titulo}</h4>
            {props.lista.length > 0 
                ? <p>{listar(props.lista)}</p>
                : <p>{props.texto}</p>
            }
        </Paper>
    )
}

export default PaperPerfil;