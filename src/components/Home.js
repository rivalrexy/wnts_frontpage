import React, { useState, useEffect } from "react";
import WntsDataService from "../services/WntsService";
import { Link } from "react-router-dom";

const Home = () => {
    const [home, setHome] = useState([]);
    const [currentHome, setCurrentHome] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
  
    useEffect(() => {
      retrieveHome();
    }, []);
  
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveHome = () => {
      WntsDataService.getAll()
        .then((response) => {
          setHome(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const refreshList = () => {
      retrieveHome();
      setCurrentHome(null);
      setCurrentIndex(-1);
    };
  
    const setActiveHome = (home, index) => {
      setCurrentHome(home);
      setCurrentIndex(index);
    };
  
    const removeAllHome = () => {
      WntsDataService.removeAll()
        .then((response) => {
          console.log(response.data);
          refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const findByTitle = () => {
      WntsDataService.findByTitle(searchTitle)
        .then((response) => {
          setHome(response.data);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    return (
      <div >
        <div style={{ 
            display: 'flex',
            justifyContent:'center', 
            alignItems:'center',
            backgroundImage: `url(${process.env.PUBLIC_URL+"/bgWNTS.png"})`,
            backgroundRepeat: 'no-repeat',
            height:'800px',
            width:'1800px' 
        }}>
        </div>
        <div className="col-md-8 mt-2">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by title"
              value={searchTitle}
              onChange={onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={findByTitle}>
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Home List</h4>
  
          <ul className="list-group">
            {home &&
              home.map((home, index) => (
                <li
                  className={
                    "list-group-item " + (index === currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveHome(home, index)}
                  key={index}>
                  {home.title}
                </li>
              ))}
          </ul>
  
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={removeAllHome}>
            Remove All
          </button>
        </div>
        <div className="col-md-6">
          {currentHome ? (
            <div>
              <h4>Home</h4>
              <div>
                <label>
                  <strong>Title:</strong>
                </label>{" "}
                {currentHome.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentHome.description}
              </div>
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentHome.published ? "Published" : "Pending"}
              </div>
  
              <Link
                to={"/home/" + currentHome.id}
                className="badge badge-warning">
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Home...</p>
            </div>
          )}
        </div>
      </div>
    
    );
  };
  
  export default Home;
  