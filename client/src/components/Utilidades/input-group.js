import React from 'react';
import classnames from 'classnames';

const InputGroup = (props) => {
  
  const renderGroup = (caso) => {
    let group = null;

    switch (caso) {
      case ("input"): 
        group = (
          <div className="p-1">
            <h5 className="font-weight-bold text-secondary" htmlFor={props.name}>{props.label}</h5>
            <input
              autoFocus={props.autoFocus ? true : false}
              type={props.type}
              name={props.name}
              className={classnames('form-control form-control-lg', {'is-invalid': props.error})}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
            />
            {props.error && <div className="invalid-feedback">{props.error}</div>}
          </div>
          );
      break;
      case ("select"):
        group = (
          <div className="p-1">
            <h5 className="font-weight-bold text-secondary" htmlFor={props.name}>{props.label}</h5>
            <select 
              className={classnames('form-control form-control-lg', {'is-invalid': props.error})}
              autoFocus={props.autoFocus ? true : false}
              name={props.name}
              type={props.type}
              value={props.value}
              onChange={props.onChange}
            >
            <option value="">Seleccionar...</option>
              {
                props.list ? 
                  props.list.map(item => (
                    <option key={item._id} value={item.nombre}>
                      {item.nombre}
                    </option>
                  ))
                : null
              }
            </select>
            {props.error && <div className="invalid-feedback">{props.error}</div>}
          </div>
        );
      break;
      case ("textarea"):
        group = (
          <div className="p-1">
            <h5 className="font-weight-bold text-secondary" htmlFor={props.name}>{props.label}</h5>
            <textarea 
              name={props.name}
              type={props.type}
              className={classnames('form-control form-control-lg', {'is-invalid': props.error})}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
            />
            {props.error && <div className="invalid-feedback">{props.error}</div>}
          </div>
        )
      break;
      default:
        group = null;
    }

    return group;
  }

  return (
    props.disabled ?
      <fieldset disabled>
        <div className="form-group">
          {renderGroup(props.caso)}
        </div>
      </fieldset>
    :
      <div className="form-group">
        {renderGroup(props.caso)}
      </div>
  )
}

export default InputGroup;