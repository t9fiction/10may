import React, { useState,useEffect,Component  } from 'react'
import { GlobalStore } from '../context/GlobalState';
import axios from 'axios';
import { Button, Modal } from 'react-bootstrap';
import "../../node_modules/video-react/dist/video-react.css";
import { Player } from 'video-react';
const Url = 'http://18.193.198.186:4000/api/';

export const AdminPanel = () => {
  const { getApplicantCount, applicants, setAppNumber, checkApp, appNumber, recVideo, acceptApplication, rejectApplication } = GlobalStore();
  const [visibleItem, setVisibleItem] = useState('');
  const [visibleApp, setVisibleApp] = useState('');
  const [user, setUser] = useState([]);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // console.log("kisi",appNumber)
      // checkApp();
    } catch (error) {
      console.log("error", error);
    }
  }
   useEffect(() => {
  getApplicantCount();
  loadAllData();
}, [])

const [url, setUrl] = useState('');
const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);


  // const handleShow = () => setShow(true);
  function handleShow(e){
     setShow(true);
    setUrl('http://18.193.198.186:4000/uploads/uploads/'+e.currentTarget.getAttribute('data-column'));
    // videoUrl = videoUrl+''+e.currentTarget.getAttribute('data-column');
  }

function loadAllData() {
  // console.log(currentAccount,'currentAccount currentAccount -polo');

console.log('fetch info loadAllData')
    axios.post(Url + "fetchAll", '', { // receive two parameter endpoint url ,form data 
  })
    .then(res => { 
     var createHtml = '';
      for (var i = 0; i <  res.data.Data.length; i++) {
        createHtml+= res.data.Data[0]['name']+' test';
      }
      console.log(createHtml);
      console.log('data before Admin');
      setUser(res.data.Data);

      console.log(user);
      console.log('list of all users');
    });


}

function acceptApp(e){
  console.log("user");
  console.log('acceptApplication checking app');
  console.log(e.currentTarget.getAttribute('data-column'));


  const fetchdata = new FormData();
  fetchdata.append('currentAccount', e.currentTarget.getAttribute('data-column'));
  // console.log(currentAccount,'currentAccount currentAccount -polo');

console.log('fetch info form')
    axios.post(Url + "delete", fetchdata, { // receive two parameter endpoint url ,form data 
  })
    .then(res => { // then print response status
        // console.log('inside of if delete function');
        setUser(res.data.Data);
      acceptApplication();
    });

  
}

function deleteApp(e){
  console.log("user");
  console.log('deleteApp checking app');
  console.log(e.currentTarget.getAttribute('data-column'));


  const fetchdata = new FormData();
  fetchdata.append('currentAccount', e.currentTarget.getAttribute('data-column'));
  // console.log(currentAccount,'currentAccount currentAccount -polo');

console.log('fetch info form')
    axios.post(Url + "delete", fetchdata, { // receive two parameter endpoint url ,form data 
  })
    .then(res => { // then print response status
        console.log('inside of if delete function');
        setUser(res.data.Data);
      rejectApplication();
    });

  
}


  return (

    <div>
    
     <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Login Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
       <Player
      playsInline
      poster="/assets/poster.png"
      src={url}
    />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

        <div className="application-form">
          <h3>Total Pending Applications : {applicants} </h3>
          <table class="table table-dark">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Account</th>
      <th scope="col">Email</th>
      <th scope="col">Country</th>
      <th scope="col">City</th>
      <th scope="col">Industry</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
  <tr>
      <td scope="col">#</td>
      <td scope="col">Name</td>
      <td scope="col">Account</td>
      <td scope="col">Email</td>
      <td scope="col">Country</td>
      <td scope="col">City</td>
      <td scope="col">Industry</td>
      <td scope="col">Action</td>
  </tr>
   {user.map(users => (
      
     <tr>  
      <td scope="row">1</td>
      <td>{users.name}</td>
      <td>{users.account}</td>
      <td>{users.email}</td>
      <td>{users.country}</td>
      <td>{users.city}</td>
      <td>{users.industry}</td>
      <td>
       <Button  type="button" onClick={handleShow} data-column={users.image}>
          Video
        </Button>
        /
        <Button type="button"  onClick={acceptApp} data-column={users.account} >Accept</Button>
        /
       <Button type="button"  onClick={deleteApp} data-column={users.account} >Reject</Button>

        </td>
    </tr>

      ))}
       
      
  </tbody>
</table>
        </div>

    </div>

   
  )
}
