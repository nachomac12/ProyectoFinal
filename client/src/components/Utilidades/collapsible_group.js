import React, { Component } from 'react';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

class CollapsibleGroup extends Component {
  state = {
    open: this.props.open
  }

  collapseHandler = () => {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="card">
        <div className="card-header bg-white" onClick={() => this.collapseHandler()}>
          <button className="btn btn-link">
            {this.props.titulo}
          </button>
          <KeyboardArrowDownIcon style={{float:'right'}}/>
        </div>
          {
            this.state.open ? 
              <div className="card-body">
                {this.props.children}
              </div>
            : null
          }
      </div>
    )
  }
}

export default CollapsibleGroup;