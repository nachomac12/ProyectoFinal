import React from 'react';

const Modal = (props) => {
  return (
    <div>
      <div data-toggle="modal" data-target={`#${props.id}`}>
        {props.children}
      </div>
      <div className="modal fade" id={props.id} tabIndex="-1" role="dialog" aria-labelledby={`${props.id}Label`} aria-hidden="true">
          <div className="modal-dialog" role="document">
            <div className="modal-content" style={props.modalStyle}>
              <div className="modal-header">
                <h5 className="modal-title" id={`${props.id}Label`}>{props.title}</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={props.bodyStyle}>
                {props.body}
              </div>
              <div className="modal-footer" style={props.footerStyle}>
                {props.footer}
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Modal;