import React from 'react';
import Modal from 'react-modal';
import s from './ImageModal.module.css';

const ImageModal = ({ modalImage, onClose }) => {
  return (
    <>
      <div className={s.overlay} onClick={onClose}></div>
      <Modal
        isOpen={!!modalImage}
        onRequestClose={onClose}
        className={s.modal}
        overlayClassName={s.overlay}
        ariaHideApp={false}
      >
        <img
          className={s.img}
          src={modalImage.urls.regular}
          alt={modalImage.alt_description}
        />
        <p className={s.text}>Author: {modalImage.user.name}</p>
        <p className={s.text}>Likes: {modalImage.likes}</p>
      </Modal>
    </>
  );
};

export default ImageModal;
