import React, { Component } from "react";
import { Switch, Route, Link } from 'react-router-dom';
import { render } from "react-dom";

class LoginPage extends Component {
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
                <div className="login">
                    <p>View my families</p> <p>View shared with me</p>
                    <button>family image</button> <button>services image</button>
                </div>

                <div id="hello">
                    <img src="" alt="Account holder profile icon"/>
                    <div>Hello, username</div>
                </div>
            </div>
        );
    }  
}


export default LoginPage;