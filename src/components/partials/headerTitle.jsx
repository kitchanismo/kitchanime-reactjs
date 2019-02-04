import React from 'react'

const HeaderTitle = ({ total, title }) => {
  return (
    <div className="row no-gutters align-items-center">
      <div className="col  d-flex justify-content-start align-items-center">
        <span>
          <h1 className="mb-3">{title}</h1>
        </span>
        <h5>
          <span className="badge badge-pill badge-primary ml-2">{total}</span>
        </h5>
      </div>
    </div>
  )
}

export default HeaderTitle
