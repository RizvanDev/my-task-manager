import React from 'react'

const InfoAuthModal = ({ authInfoModal, createAuthInfoModal }) => {
  const styleObj = {
    position: 'absolute',
    top: '8%',
    left: '50%',
    transform: 'translateX(-50%)',
    with: '100%',
    padding: '6px',
    background: authInfoModal.type === 'Error' ? 'red' : 'green',
    fontSize: '16px',
    color: '#fff',
    whiteSpace: 'nowrap',
    zIndex: '100',
  }

  setTimeout(() => createAuthInfoModal({ ...authInfoModal, show: false }), 3000)

  return <div style={styleObj}>{authInfoModal.text}</div>
}

export default InfoAuthModal
