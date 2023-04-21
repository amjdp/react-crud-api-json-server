import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


function Update() {
  // const [data, setData] = useState([]);
  const { id } = useParams();
  const[values, setValues] = useState({
    name: '',
    email:'',
    phone:''
  })

  useEffect(() => {
    axios
      .get("http://localhost:3000/users/" + id)
      .then(res => {
        setValues(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const navigate = useNavigate();

  const handleUpdate = (event) => {
    event.preventDefault();
    axios.put('http://localhost:3000/users/' + id, values)
    .then(res => {
      console.log(res);
      navigate("/");
    })
    .catch(err => console.log(err));
  }

  return (
    <div className='d-flex w-100 vh-100 justify-content-center align-items-center bg-light'>
    <div className='w-50 rounded bg-white border shadow px-5 pt-3 pb-5'>
      <h1>Update a User</h1>
      <form onSubmit={handleUpdate}>
        <div className='mb-2'>
          <label htmlFor="name">Name : </label>
          <input type="text" name='name' className='form-control' placeholder='Enter your name'
           value={values.name} onChange={e => setValues({...values, name: e.target.value})} />
        </div>
        <div className='mb-2'>
          <label htmlFor="email">Email : </label>
          <input type="email" name='email' className='form-control' placeholder='Enter your email'
          value={values.email} onChange={e => setValues({...values, email: e.target.value})} />
        </div>
        <div className='mb-2'>
          <label htmlFor="phone">Phone : </label>
          <input type="text" name='phone' className='form-control' placeholder='Enter your phone number'
           value={values.phone} onChange={e => setValues({...values, phone: e.target.value})} />
        </div>
        <button className='btn btn-success'>Update</button>
        <Link to="/" className="btn btn-primary ms-3">Back</Link>
      </form>
    </div>
  </div>
  )
}

export default Update