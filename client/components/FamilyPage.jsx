import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { render } from "react-dom";

class FamilyPage extends Component {
    constructor() {
        super();

        this.state = {
            
        };

        //bind family button to go to members page
    }



    //fetch from database family name(s), members, services
    componentDidMount() {
        //fetch('');
        //.then(res => res.json());
        //.catch(err => console.log('Whoops, error!', err));
      }
}


export default FamilyPage;