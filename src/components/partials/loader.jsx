import React from 'react'

const Loader = ({ isLoaded, children }) => {
  return (
    <React.Fragment>
      {!isLoaded && (
        <div className="spin d-flex justify-content-center justify-items-center">
          <div className="spinner spinner-grow" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}

      {isLoaded && children}
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

export default Loader
