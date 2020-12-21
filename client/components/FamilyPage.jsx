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

                    <button>View shared with me</button>
                </div>

                <div className="familyName">
                    <div>Family name</div> <button>Edit</button>
                    <div>Number of users</div>
                    <div>Number of services</div>
                </div>

                <div className="userServicesIcons">
                    <img src="" alt="User2"/>
                    <img src="" alt="User3"/>
                    <img src="" alt="User5"/>
                    <button style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>+</button> <button style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>-</button>
                </div>

                <div className="userServicesIcons">
                    <img src="" alt="Service1"/>
                    <img src="" alt="Service2"/>
                    <img src="" alt="Service3"/>
                    <button style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>+</button> <button style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>-</button>
                </div>    

                <div className="addRemoveButtons">
                    <button>+</button>
                    <button>-</button>
                </div>

            </div>
        );
    }  
}


export default FamilyPage;