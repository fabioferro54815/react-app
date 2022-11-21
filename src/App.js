import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./App.css";

const baseURL = `https://mack-webmobile.vercel.app/api`;

export default function App() {
  const [user, setUser] = useState({
    name: "",
    avatar: "",
    email: "",
    salary: "",
    date: "",
    status: ""
  });
  const [users, setUsers] = useState([]);
  const [photoUrl, setPhotoUrl] = useState();

  const [userId, setUserId] = useState();
  const [userPost, setUserPost] = useState();

  useEffect(() => {
    axios.get(baseURL + "/users")
    .then((response) => {
      setUsers(response.data);
    })
  }, []);

  const generatePhoto = () => {
    axios.get("https://randomuser.me/api/?inc=results,picture,medium")
    .then((response) => {
      setPhotoUrl(response.data.picture.medium);
      console.log(response.data.picture.medium);
    })
  }

  const getById = (event) => {
    setUserId(event.target.attributes[0].value);

    axios.get(baseURL + "/users/" + userId)
      .then((response) => {
        setUser(response.data);
        console.log(user);
      });
  }

  const deleteUser = (event) => {
    setUserId(event.target.attributes[0].value)
    axios.delete("/users/" + userId)
      .then((response) => {
        console.log(response);
      });
  }

  const handleChange = (event) => {
    console.log(event)
    setUser({ ...user, [event.target.name]: event.target.value });
    console.log(user)
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    generatePhoto();

    axios.post(baseURL + "/users", {
        name: user.name,
        avatar: photoUrl,
        email: user.email,
        salary: user.salary,
        date: user.date,
        status: "Active"
      })
      .then((response) => {
        setUserPost(response.data);
        //limpar o valor dos inputs
      });
  }

  const handleSubmitPut = (event) => {
    event.preventDefault();

    generatePhoto();

    axios.put(baseURL + "/users", {
        name: user.name,
        avatar: photoUrl,
        email: user.email,
        salary: user.salary,
        date: user.date,
        status: "Active"
      })
      .then((response) => {
        setUserPost(response.data);
        setUser({
          name: "",
          avatar: "",
          email: "",
          salary: "",
          date: "",
          status: ""
        });
      });
  }

  return (
    <>
    <form onSubmit={handleSubmit} onChange={handleChange}>
      <input type="text" name="name" />
      <input type="email" name="email" />
      <input type="text"  name="salary" />
      <input type="date"name="date" />
      <input type="checkbox" name="status" />
      <input type="submit" />
    </form>

      {users.map((user) => (      
        <div key={user._id} className="container" id="container">
          <div className="card">
            <div className="card">
                <div className="boxcima">
                    <img className="img" src={user.avatar} />
                    <img className="img2" src="faixa.png" />
                </div>
                <div>
                    <h4 className="nome">{user.name}</h4>
                    <a className="email">{user.email}</a>
                    <p className="escrita1">Salário: <b>{user.salary}</b></p>
                    <img onClick={getById} value={user._id} className="edit" src="lapis.png" />
                    <p className="escrita2">Aniversário: <b>{user.date}</b></p>
                    <img onClick={deleteUser} className="delete" src="trash.png" />
                    <p>{user.status}</p>
                </div>
            </div>
          </div>
        </div>
      ))}
  </>
)}