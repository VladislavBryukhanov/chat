import React, {Component} from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class Rooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: [],
            roomName: ''
        }
    }

    componentWillMount() {
        axios.defaults.baseURL = this.props.serverIp;
        axios.get("/rooms/getRooms")
            .then((res) => {
                this.setState({rooms: res.data});
            })
    }

    onRoomNameChanged = (e) => {
        this.setState({roomName: e.target.value});
    }

    addRoom = () => {
        let room = {
            name: this.state.roomName,
            access: 'user'
        };
        axios.post('/rooms/addRoom', room)
            .then((res) => {
                this.setState({
                    rooms : [
                        ...this.state.rooms, res.data
                    ],
                    roomName: ''
                })
            })
    }

    render() {
        return (
            <div>
                {
                    this.state.rooms.map(item => {
                        return (
                            <p key={item._id}>
                                <Link to={`/dialog/${item._id}`}>
                                    {item.name}
                                </Link>
                            </p>
                        )
                    })
                }
                <div>
                    <input
                        value={this.state.roomName}
                        onChange={this.onRoomNameChanged}
                        placeholder="room name"/>
                    <button onClick={this.addRoom}>Add room</button>
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => ({
    serverIp: state.serverIp
});

export default connect(
    mapStateToProps,
    null
)(Rooms)