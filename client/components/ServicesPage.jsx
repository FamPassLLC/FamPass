import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import ServicesDisplay from './ServicesDisplay';
import SideBar from './SideBar';


function ServicesPage(props) {

  const services = [];

  for(let i = 0; i < props.extFamilyService.length; i++) {
    services.push(<ServicesDisplay
      key={i} 
      family_name={props.extFamilyService[i].family_name}
      local_user={props.extFamilyService[i].local_user}
      service={props.extFamilyService[i].service}
      />)
  };

  return (
    <div className='d-flex'>
      <div className='col-3 px-0'>
        <SideBar switchTo='View my families' currentUser={props.currentUser}/>
        
      </div>
      <div className='col-8 mt-5 pt-5 ml-5'>
        
          {services}
                
        <div className='d-flex justify-content-end align-items-end'>
          <button className='btn btn-primary'>+ Add Service</button>
          
        </div>
      </div>
    </div>
  );
}

export default ServicesPage;