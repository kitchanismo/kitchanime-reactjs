import React from 'react'

const BackButton = props => {
  const handleBack = () => props.history.goBack()
  return (
    <React.Fragment>
      <span className=" d-flex justify-content-end" />
      <button onClick={handleBack} className="btn btn-secondary">
        <span className="fa fa-arrow-left mr-1" />
        BACK
      </button>
    </React.Fragment>
  )
}

export default BackButton
