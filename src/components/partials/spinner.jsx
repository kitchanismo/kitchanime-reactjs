import React, { Component } from 'react'

class Spinner extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.isLoaded && (
          <div className="spin d-flex justify-content-center justify-items-center">
            <div className="spinner spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {this.props.isLoaded && this.props.children}
        <style jsx>{`
          .spin {
            position: fixed;
            z-index: 1031;
            top: 40%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Spinner
