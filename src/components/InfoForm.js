import React, { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import { GlobalStore } from '../context/GlobalState';
import axios from 'axios';
import { AdminPanel } from './AdminPanel';
import Swal from 'sweetalert2';
const Url = 'http://18.193.198.186:4000/api/';

export const InfoForm = () => {

  const { setCity, city, setCountry, country, tokenSupply, setIndustry, industry, setEmail, email, setApplicantName, applicantName, formData, setFormData, setFileUploaded, fileUploaded, sendApplication, isOwner, checkOwner, handleChange, currentAccount, alreadySubmit, setAlreadySubmit } = GlobalStore();
  console.log("fileuploaded,", fileUploaded);

  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [videoError, setVideoError] = useState("");
  useEffect(() => {
    loadPage();
  }, [])

  function loadPage() {
    const fetchdata = new FormData();
    fetchdata.append('currentAccount', currentAccount);
    axios.post(Url + "fetch", fetchdata, { // receive two parameter endpoint url ,form data 
    })
      .then(res => { // then print response status

        if (res.data.Data.length > 0) {
          setAlreadySubmit(true);
          setApplicantName(res.data.Data[0]['name']);
          setCountry(res.data.Data[0]['country']);
          setIndustry(res.data.Data[0]['industry']);
          setCity(res.data.Data[0]['city']);
          setEmail(res.data.Data[0]['email']);
        }
      });
  }



  const onFileChange = async (e) => {
    // Update the state 
    e.preventDefault();
    setFileUploaded(e.target.files[0]);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    var flagValidation = true;
    //validation for email
    if (email === '') {
      setEmailError('Email is required');
      flagValidation = false;
    } else {
      if (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)) {
        setEmailError('');
      } else {
        setEmailError('Enter valid email address');
        flagValidation = false;
      }
    }

    //validation for name
    if (applicantName === '') {
      setNameError('Name is required');
      flagValidation = false;
    } else {
      setNameError('');
    }
    //validation for file
    if (fileUploaded === '') {
      setVideoError('File is required');
      flagValidation = false;
    } else {
      setVideoError('');
    }

    if (tokenSupply >= 1) {
      const data = new FormData();
      // console.log(fileUploaded, 'file settings');
      // await checkOwner();
      // await sendApplication();

      if (flagValidation) {
          sendApplication().then(() => {
          data.append('fileUploaded', fileUploaded);
          data.append('email', email);
          data.append('applicantName', applicantName);
          data.append('country', country);
          data.append('amount', 0);
          data.append('city', city);
          data.append('industry', industry);
          data.append('currentAccount', currentAccount);

          axios.post(Url + "add", data, { // receive two parameter endpoint url ,form data 
          })
            .then(res => { // then print response status
              // Swal.hideLoading();
              setAlreadySubmit(true);
              console.log(res.statusText)
            })
          })
        }
      // if (!email || !amount || !country || !applicantName || !city || !industry) return;
    } else (
      Swal.fire("You don't have enough BUSD. You need 1 BUSD to apply")
    )
  }

  function getApplicantName(val) {
    setApplicantName(val.target.value);
    console.log(val.target.value);
  }

  function getCountry(val) {
    setCountry(val.target.value);
    console.log(val.target.value);
  }
  function getIndustry(val) {
    setIndustry(val.target.value);
    console.log(val.target.value);
  }
  function getCity(val) {
    setCity(val.target.value);
    console.log(val.target.value);
  }
  function getEmail(val) {
    setEmail(val.target.value);
    console.log(val.target.value);
  }


  console.log('checking ');
  return (
    <>
      {!isOwner && !alreadySubmit ?
        <div className="application-form">
          <h4>Application</h4>
          <form action="#" method="post" enctype="multipart/form-data">
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">Name:</label>
                  <input placeholder="Enter Name " onChange={getApplicantName} className="form-control" name="applicantName" type="text" defaultValue={applicantName} />
                  <label class="error">{nameError}</label>
                  {/* <input placeholder="Enter Name " value={formData.applicantName} name="applicantName" type="text" /> */}
                  {/* <Input placeholder="Amount (ETH)" name="amount" type="number" handleChange={handleChange} /> */}
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email:</label>
                  <input placeholder="Email" name="email" type="email" className="form-control" onChange={getEmail} defaultValue={email} />
                  <label class="error">{emailError}</label>
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="city" className="form-label">City:</label>
                  <input placeholder="Enter City" name="city" type="text" className="form-control" onChange={getCity} defaultValue={city} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="country" className="form-label">Country:</label>  <input placeholder="Enter Country" className="form-control" name="country" onChange={getCountry} type="text" defaultValue={country} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="industry" className="form-label">Industry:</label>
                  <input placeholder="Enter Industry.." className="form-control" name="industry" onChange={getIndustry} type="text" defaultValue={industry} />
                </div>
              </div>
              <div className="col-md-6">
                <div className="form-group">
                  <label htmlFor="video" className="form-label">Video:</label>
                  <input type="file" id="myFile" className="form-control" name="filename" accept="video/*" onChange={onFileChange} />
                  <label class="error">{videoError}</label>
                </div>
              </div>
              <div className="col-md-12">
                <Button type="button" className="meta-btn" onClick={handleSubmit} >Submit</Button>
              </div>
            </div>
          </form>
        </div>
        : !isOwner && alreadySubmit ?
          <div className='submit' role="alert">
            <strong> You application has already been submitted.</strong>
          </div> : <AdminPanel />
      }
    </>
  )
}
