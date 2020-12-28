import React, { Component, useEffect, useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import ServicesDisplay from './ServicesDisplay';
import SideBar from './SideBar';

function ServicesPage(props) {
  const [services, setServices] = useState([]);
  let extFamilyService;
  //GET request that identifies families that user is a member of
  useEffect(() => {
    fetch('/api/families/allfamilies')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const userFams = data
          .filter((el) => el.username === props.local_user.username)
          .map((el) => el.family_name);
        props.setExtFamily(userFams);
      })
      //GET request that identifies services provided by families that user is a member of
      .then(() => {
        fetch('/api/services/get-login-info')
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log('data', data);
            const familyServices = data.filter((el) =>
              props.extFamily.includes(el.family_name)
            );
            extFamilyService = familyServices;
            const servicesArr = [];
            for (let i = 0; i < extFamilyService.length; i++) {
              servicesArr.push(
                <ServicesDisplay
                  key={i}
                  family_name={extFamilyService[i].family_name}
                  local_user={extFamilyService[i].local_user} //this local_user(from db) is one who is sharing the service
                  service={extFamilyService[i].service}
                />
              );
            }
            setServices(servicesArr);
          });
      })
      .catch((err) => console.log(err));
  }, [services]);

  return (
    <div className='d-flex'>
      <div className='col-3 px-0'>
        <SideBar
          switchTo='View my families'
          local_user={props.local_user.username}
        />
      </div>
      <div className='col-8 mt-5 pt-5 ml-5'>
        {services}

        {/* <div className='d-flex justify-content-end align-items-end'>
          <button className='btn btn-primary'>+ Add Service</button>

        </div> */}
      </div>
    </div>
  );
}

export default ServicesPage;
