import React, { Component } from 'react'
import {Meteor} from 'meteor/meteor'
import { FormGroup, FormControl, InputGroup, Glyphicon } from 'react-bootstrap'



export default class TwitterData extends Component {

	constructor(props) {
		super(props)
		this.state = {
			query: ""
		}
		// this.getFollower = this.getFollower.bind(this)
	}

	getFollower() {
		console.log("there")
		Meteor.call("get_followers", this.state.query, (err, res) => {
			if(err)
				console.log(err)
			else
				console.log(res)
		})
	}

	render() {
		return(
			

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


		)
	}
}