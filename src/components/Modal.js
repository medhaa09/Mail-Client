/* eslint-disable no-unused-vars */

import React, { useState } from 'react';
import './Modal.css';

const Modal = ({ isOpen, closeModal }) => {
  return (
    <div className='modalparent'>
      <section className={`modal ${isOpen ? '' : 'hidden'}`}>
      
        <div className="flex">
          <button className="btn-close" onClick={closeModal}>⨉</button>
        </div>
        <div>
          <h3>New Message</h3>
        </div>
        <input type="email" id="email" placeholder="Recepient" />
        <input type="text" id="subject" placeholder="Subject" />
        <label for="paragraphInput">Enter Paragraph:</label>
        <textarea id="paragraphInput" rows="4" cols="100" style={{width: "100%", height: "250px", resize:"none"}}></textarea>
        <button className="btn" style={{backgroundColor:'black'}}>Send</button>
      </section>

      <div className={`overlay ${isOpen ? '' : 'hidden'}`} onClick={closeModal}></div>
    </div>
  );
};
export default Modal;
