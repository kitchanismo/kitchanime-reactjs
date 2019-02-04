import React from 'react'

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control" />
      {/* {error && <div className="alert p-2 mt-2 alert-danger">{error}</div>} */}
      {error && <p className="text-danger p-2 ">{error}</p>}
    </div>
  )
}

export default Input
