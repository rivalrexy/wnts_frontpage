import React, { useState, useEffect } from "react";
import WntsDataService from "../services/WntsService";
import { Link } from "react-router-dom";

const HomeBackup = () => {
    const [home, setHome] = useState([]);
    const [currentHome, setCurrentHome] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
      retrieveHome();
    }, []);

    const uppercaseKeys = (jsonVal) => {
      for(var i = 0; i<jsonVal.length;i++) {
        var a = jsonVal[i];
        for (var key in a) {
            if (a.hasOwnProperty(key)) {
              a[key.toUpperCase()] = a[key];
              delete a[key];    
            }
        }
        jsonVal[i] = a;
      }
        return jsonVal;
    }

    // const uppercaseKeys = obj =>
    //   Object.keys(obj[0]).reduce((acc, key) => {
    //     acc[key.toUpperCase()] = obj[key];
    //     return acc;
    // }, {});
    
    const onChangeSearchTitle = (e) => {
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
    };
  
    const retrieveHome = () => {
      WntsDataService.getAll()
        .then((response) => {
          const newJSON = uppercaseKeys(response.data);
          setHome(newJSON);
          console.log(newJSON);
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
          const newJSON = uppercaseKeys(response.data);
          console.log(newJSON);
          refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    };
  
    const findByTitle = () => {
      WntsDataService.findByTitle(searchTitle)
        .then((response) => {
          const newJSON = uppercaseKeys(response.data);
          setHome(newJSON);
          console.log(newJSON);
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
                  {home.DATE_STAMP}
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
                  <strong>Date Stamp:</strong>
                </label>{" "}
                {currentHome.DATE_STAMP}
              </div>
              <div>
                <label>
                  <strong>C1:</strong>
                </label>{" "}
                {currentHome.C1}
              </div>
              <div>
                <label>
                  <strong>C2:</strong>
                </label>{" "}
                {currentHome.C2 ? "Published" : "Pending"}
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
  
  export default HomeBackup;
  