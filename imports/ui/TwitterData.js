import React, { Component } from 'react'
import {Meteor} from 'meteor/meteor'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'
import ReactTable from 'react-table'
import 'react-table/react-table.css'





export default class TwitterData extends Component {

	constructor(props) {
		super(props)
		this.state = {
			query: "",
			followers: null
		}
		// this.getFollower = this.getFollower.bind(this)
	}

	getFollower() {
		console.log("there")
		Meteor.call("get_followers", this.state.query, (err, res) => {
			if(err)
				console.log(err)
			else{
				console.log(res)
				this.setState({followers: res})
			}
		})
	}

	logout() {
		Meteor.logout()
	}

	render() {
		const col = [{
			Header: 'ID',
			accessor: 'id_str'
		},{
			Header: 'SCREEN NAME',
			accessor: 'screen_name'
		},{
			Header: 'LOCATION',
			accessor: 'location'
		},{
			Header: 'FRIENDS COUNT',
			accessor: 'friends_count'
		},{
			Header: 'FOLLOWERS COUNT',
			accessor: 'followers_count'
		}]
		return(
			<div>

			<FormGroup>
			<InputGroup>
			<FormControl
			type = "text"
			placeholder = "Search for an person"
			value = {this.state.query}
			onChange = {event => {this.setState({query: event.target.value});}}
			onKeyPress = { event => {
				if(event.key === 'Enter'){
					this.getFollower();
				}
			}}
			/>
			<InputGroup.Addon className =  "searchButton" onClick = {() => this.getFollower()}>
			<Glyphicon glyph = "search"></Glyphicon>
			</InputGroup.Addon>
			</InputGroup>
			</FormGroup>

			<button onClick = { this.logout }>Log Out</button>

			{this.state.followers === null ? <div></div> : 
				<ReactTable
				data = {this.state.followers}
				columns = {col}
				/>
			}


			</div>

			)
	}
}