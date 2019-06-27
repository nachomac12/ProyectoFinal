import React, { Component } from 'react'

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
        <div className="card-header bg-white">
          <button className="btn btn-link" onClick={() => this.collapseHandler()}>
            {this.props.titulo}
          </button>
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