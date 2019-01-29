import React, { Component } from 'react'

class Spinner extends Component {
  render() {
    return (
      <React.Fragment>
        {!this.props.isLoaded && (
          <div className="d-flex justify-content-center justify-items-center mt-5">
            <div className="mt-5 spinner-grow" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )}
        {this.props.isLoaded && this.props.children}
        <style jsx>{`
          .spinner-content {
            width: 3rem !important;
            height: 3rem !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}

export default Spinner
