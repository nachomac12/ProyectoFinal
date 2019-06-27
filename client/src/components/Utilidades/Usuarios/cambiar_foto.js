import React, { Component } from 'react';
import Edit from '@material-ui/icons/EditOutlined';
import './CambiarFoto.css';
import axios from 'axios';
import { cambiarFotoPerfil } from '../../../redux/actions/usuario_actions';
import { connect } from 'react-redux';
import CircularProgress from '@material-ui/core/CircularProgress';

class CambiarFoto extends Component {
  state = {
    loading: false
  }

  onChange = e => {
    if (e.target.files[0]) {
      const imagen = e.target.files[0];
      let formData = new FormData();
      formData.append("file", imagen);
      var dataToSubmit = {}
      axios.post('/api/usuarios/uploadfile', formData).then(res1 => {
        if (res1.data.success) {
          axios.get('/api/usuarios/files').then(res2 => {
            dataToSubmit = {"fotoDePerfil": res2.data.url}
            this.props.dispatch(cambiarFotoPerfil(dataToSubmit, this.props.data))
            .then(res3 => {
              console.log(res3)
              this.setState({loading: true})
              setTimeout(() => {
                this.setState({
                  loading: false
                })
              }, 3000);
            })
          })
        }
      })
    }
  }

  render() {
    return (
      <div>
        <div style={{
            height: 300,
            width: 'auto', 
            maxWidth: 300, 
            border: '3px solid',
            borderColor: '#17a2b8',
            borderRadius: '3px',
            padding: '-2px'
        }}>
        {
          !this.state.loading ? 
            <div className="hovereffect">
              <label htmlFor="file-upload" style={{cursor: 'pointer'}}>
                <img 
                  className="img-fluid" 
                  src={this.props.data.fotoDePerfil}
                  alt="img"
                  style={{margin:'auto', display: 'block'}}
                />
                <div className="overlay">
                  <h2>Elegir foto</h2>
                  <a className="info">
                    <Edit fontSize="inherit" style={{fontSize: '4em'}}/>
                  </a>
                </div>
              </label>
            </div>
          : <div style={{
              position: "relative",
              top: 150,
              left: 125,
              transform: "translateY(-50%)",
            }}>
              <CircularProgress style={{color: '#2196F3'}} thickness={7} />
            </div>
        }
        </div>
        <input 
          id="file-upload"
          type="file"
          onChange={this.onChange}
          style={{display: 'none'}}
        />
      </div>
    )
  }
}

export default connect()(CambiarFoto);