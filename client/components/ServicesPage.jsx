import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { render } from "react-dom";

class ServicesPage extends Component {
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

    render() {
        return (
            <div>
                <div className="accountBar">
                    <img>User profile icon</img>
                    <div>Username</div>
                    <p>Basic Tier</p>

                    <div id="totalUsers">
                        <img src="" alt="User1"/> <img src="" alt="User2"/> <img src="" alt="User3"/>
                        <img src="" alt="User4"/> <img src="" alt="User5"/>
                    </div>

                    <button>View my families</button>
                </div>

                <div className="services">
                    <div id="userIcon">
                        <img src="" alt="User6"/>
                    </div>

                    <div id="buttons">
                        <button>Netflix icon</button>    
                    </div>
                </div>

                <div className="addButtons">
                    <button>+</button>
                </div>

            </div>
        );
    }  
}


export default ServicesPage;