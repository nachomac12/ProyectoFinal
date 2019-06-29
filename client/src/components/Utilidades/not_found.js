import React from 'react';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

const NotFound = () => {
    return (
        <div className="row justify-content-center" style={{padding: '150px'}}>
            <div className="col-md-9 text-secondary text-center">
                <ErrorIcon style={{fontSize: '100px'}} />
                <h1 className="font-weight-bold">¡Oops! Parece que la página que estás buscando no existe.</h1>
            </div>
        </div>
    )
}

export default NotFound;