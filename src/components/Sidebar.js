import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faInbox } from '@fortawesome/free-solid-svg-icons';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal';
import './Sidebar.css';
import {useNavigate} from 'react-router-dom';
import React, { useState } from 'react';
const Sidebar = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const listItems = document.querySelectorAll('.sidebar-navigation ul li');
	listItems.forEach((item) => {
	  item.classList.remove('active');
	});
  
	const handleItemClick = (event) => {
	  // Remove 'active' class from all list items
	  const listItems = document.querySelectorAll('.sidebar-navigation ul li');
	  listItems.forEach((item) => {
		item.classList.remove('active');
	  });
  
	  // Add 'active' class to the clicked list item
	  event.target.closest('li').classList.add('active');
    

	  // Check if the "Compose" button was clicked
	  if (event.target.textContent === 'Compose') {
		setIsModalOpen(true); // Open the modal
	  }
	};

	const handleComposeClick = (event) => {
		// Remove 'active' class from all list items
		const listItems = document.querySelectorAll('.sidebar-navigation ul li');
		listItems.forEach((item) => {
		  item.classList.remove('active');
		});
	
		// Add 'active' class to the clicked list item
		event.target.closest('li').classList.add('active');
	
		  setIsModalOpen(true); // Open the modal
		
	  };
  
	const closeModal = () => {
	  setIsModalOpen(false); // Close the modal
	};
	const navigate= useNavigate();
	function logoutHandler(){
		navigate("/signup")
		localStorage.removeItem("token")
		localStorage.removeItem("refreshToken")
	  }
  
	return (
	  <nav className="sidebar-navigation">
		<ul className="sidebar-navigation-list">
		  <li className="active" onClick={handleItemClick}>
          <FontAwesomeIcon icon={faInbox} />
			<span className="tooltip">Inbox</span>
		  </li>
		  <li className="active" onClick={handleItemClick}>
          <FontAwesomeIcon icon={faPenToSquare} onClick={handleComposeClick}  />
			<span className="tooltip">Compose</span>
		  </li>
		  <li className="active" onClick={handleItemClick}>
          <FontAwesomeIcon icon={faTrash} />
			<span className="tooltip">Bin</span>
		  </li>
		  <li className="active" onClick={handleItemClick}>
          <FontAwesomeIcon icon={faCog} />
			<span className="tooltip">Settings</span>
		  </li>
          <li className="active" onClick={handleItemClick}>
          <FontAwesomeIcon icon={faAngleRight} onClick={logoutHandler}/>
          <span className="tooltip">Logout</span>
          </li>
		</ul>
		<Modal isOpen={isModalOpen} closeModal={closeModal} />
	  </nav>
	);
  };
  
  export default Sidebar;