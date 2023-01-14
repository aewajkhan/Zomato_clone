import React, { useEffect, useState } from "react";
// import { defaultMethod } from "react-router-dom/dist/dom";
// import { Row } from "react-bootstrap";
// import { ModalBody } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, Row, Col } from "reactstrap";
import "../../Styles/Header.css";

function Header() {
  const [modal, setmodal] = useState(false);
  const [modal1, setmodal1] = useState(false);
  const [user, setuser] = useState("");
  const [password, setpassword] = useState("");
  const [userErr, setuserErr] = useState(false);

  const homeUrl = window.location.origin;

  const [username1, setUsername1] = useState("");
  const [passw, setPassw] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  
  function Login(e) {
    // useEffect(() => {
      e.preventDefault();
      // if (user.length < 3 || password.length < 3) {
      //   alert("username and password are incorrect");
      // } else {
      //   alert("all good");
      // }
        fetch(`http://localhost:3500/userdetail/login`, {
          method: "POST",
          headers: {
            // Accept: "application/json",
            "Content-Type": "application/json",
            // token:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InJhbWFraGFudCIsImlhdCI6MTY2OTU0MjQ1MH0.qWxVWS_tpqLEBWl5qwBcb3bWL2G02RG-ShlnNytdf5o'
          },
          body: JSON.stringify({
            username: username1,
            password: passw,
            
          }),
        })
          .then((response) => {
            return response.json()
            
          }).then((data)=>{
            
            if(data.status===200){
              setmodal(!modal);
              alert('success')
              window.localStorage.setItem('user',username1)
              window.localStorage.setItem('pass',passw)
            }else{
              alert('login id password incorrect')
            }
          })
          .catch((err) => console.log(err));
    
      }
    // )};




  function userName(e) {
    let item = e.target.value;
    if (item.length < 3) {
      setuserErr(true);
    } else {
      setuserErr(false);
    }
    setuser(item);
  }
  function passwordHandler(e) {
    let item1 = e.target.value;
    if (item1.length < 3) {
      setpassword(true);
    } else {
      setpassword(false);
    }
    setpassword(item1);
  }
  
  // console.log(username1)
  // console.log(passw)
  // console.log(last_name)
  // console.log(first_name)

  function Signup(e) {
    e.preventDefault();

    // useEffect(() => {
    fetch(`http://localhost:3500/userdetail/create`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username1,
        password: passw,
        first_name: first_name,
        last_name: last_name,
      }),
    })
      .then((response) => {
        response.json();
        setmodal1(!modal1);
      })
      .catch((err) => console.log(err));
    // }, []);

    // console.log(username1)
    // console.log(username1)
  }


  function logout(){
window.localStorage.clear()
window.location.reload(true)
  }

  return (
    localStorage.getItem('user')&&localStorage.getItem('pass')?
                      <div className='log-userinformation d-flex login-signup-row' >
                           <div className='user-name '>Hello <span>{localStorage.getItem('user')}</span></div>
                           <button className='btn btn-danger col-1 logout-button' style={{margin:"10px",width:"120px"}} onClick={logout}>Logout</button>
                     </div>:
    <div>
      <Modal isOpen={modal} toggle={() => setmodal(!modal)}>
        <ModalHeader toggle={() => setmodal(!modal)}>Login</ModalHeader>
        <ModalBody>
          <form >
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor="user">username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter username"
                    onChange={(e) => setUsername1(e.target.value)}
                  ></input>{" "}
                  {userErr ? <span>user name not valid</span> : ""}
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="user">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="enter username"
                    // value={}
                    onChange={(e) => setPassw(e.target.value)}
                  ></input>{" "}
                  {password ? <span>password is not valid</span> : ""}
                </div>
              </Col>
              <button className="btn btn-primary" onClick={Login}>
                Login
              </button>
            </Row>
          </form>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal1} toggle1={() => setmodal1(!modal1)}>
        <ModalHeader toggle1={() => setmodal1(!modal1)}>Sign Up</ModalHeader>
        <ModalBody>
          <form onSubmit={Signup}>
            <Row>
              <Col lg={12}>
                <div>
                  <label htmlFor="first">username</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter first Name"
                    value={username1}
                    onChange={(e) => setUsername1(e.target.value)}
                  ></input>
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="pass">password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="enter middle name"
                    value={passw}
                    onChange={(e) => setPassw(e.target.value)}
                  ></input>
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="first">first_name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter Last name"
                    value={first_name}
                    onChange={(e) => setFirst_name(e.target.value)}
                  ></input>
                </div>
              </Col>
              <Col lg={12}>
                <div>
                  <label htmlFor="Last">last_name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="enter username"
                    value={last_name}
                    onChange={(e) => setLast_name(e.target.value)}
                  ></input>
                </div>
              </Col>
              <button className="btn btn-primary" type="submit">
                signUp
              </button>
            </Row>
          </form>
        </ModalBody>
      </Modal>

      <div className="login-signup-row row">
        <div className="col-6">
          <a href={homeUrl} className="header-logo px-4 py-3">
            Zomato
          </a>
        </div>
        <div className="col-6 text-end my-3">
          <button
            className="btn mx-2  btn-danger col-2"
            onClick={() => setmodal(true)}
          >
            login
          </button>
          <button
            className="btn mx-2 btn-danger col-3"
            onClick={() => setmodal1(true)}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
export default Header;
