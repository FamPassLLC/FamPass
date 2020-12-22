import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { render } from 'react-dom';
import FamilyDisplay from './FamilyDisplay';
import SideBar from './SideBar';

function FamilyPage() {
  return (
    <div className='d-flex'>
      <div className='col-3 px-0'>
        <SideBar />
      </div>
      <div className='col-8 mt-5 pt-5 ml-5'>
        <FamilyDisplay />
        <FamilyDisplay />
        <div className='d-flex justify-content-end'>
          <button className='btn btn-success mr-2'>Add family +</button>
          <button className='btn btn-danger '>Remove family -</button>
        </div>
      </div>
    </div>
  );
}

export default FamilyPage;
