import React from 'react'
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

const CustomModal = ({
  label,
  primary,
  secondary,
  modal,
  toggle,
  className,
  title,
  ...rest
}) => {
  return (
    <Modal isOpen={modal} toggle={toggle} className={className} {...rest}>
      <ModalHeader toggle={toggle}>{title}</ModalHeader>
      <ModalBody>{label}</ModalBody>
      <ModalFooter>
        <button
          className={`btn btn-${(primary && primary.type) || 'primary'} btn-sm`}
          name="primary"
          onClick={toggle}
        >
          {(primary && primary.label) || 'Ok'}
        </button>{' '}
        <button
          className={`btn btn-${(secondary && secondary.type) ||
            'secondary'} btn-sm`}
          name="secondary"
          onClick={toggle}
        >
          {(secondary && secondary.label) || 'Cancel'}
        </button>
      </ModalFooter>
    </Modal>
  )
}

export default CustomModal
