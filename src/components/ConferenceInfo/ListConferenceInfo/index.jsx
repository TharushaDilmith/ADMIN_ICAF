import React from 'react';
import axios from 'axios';
import './styles.css';


export default class ListConferenceInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            conference_detail: [],
            approved_details: []
        }
    }

    componentDidMount() {
        axios.get('/conference/')
            .then(response => {
                this.setState({ approved_details: response.data.data });
            })
    }

    navigateUpdatePage(e, id) {
        window.location = `/editor/${id}`
    }

    removeInfo(e, id) {     
        axios.delete(`/conference/${id}`)
            .then(response => {
                // alert('Deletion successful!')
                window.location.reload();
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        return (
            <div className="container">
                <div className="container">
                    {this.state.approved_details.length > 0 && this.state.approved_details.map((item, index) => (
                        <div key={index} className="textStyle">
                            <div onClick={e => this.navigateUpdatePage(e, item._id)}>
                                <p>Venue : {item.venue}</p>
                                <p>Dates : {item.venue_dates}</p>
                                <p>Time : {item.venue_time}</p>
                                <p>Regstration open : {item.registrationopen_date}</p>
                                <p>Regstration close : {item.lastregistration_date}</p>
                                <p>Status : {item.is_approved.toString()}</p>
                            </div>
                            <button type="submit" className="btn btn-danger" onClick={e => this.removeInfo(e, item._id)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}