// Snackbar.js
import React, { useEffect, useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const Snackbar = ({ show, message, variant = 'success', delay = 3000, onClose }) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg={variant}
        onClose={() => {
          setVisible(false);
          onClose && onClose();
        }}
        show={visible}
        delay={delay}
        autohide
      >
        <Toast.Body className="text-white">{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default Snackbar;
