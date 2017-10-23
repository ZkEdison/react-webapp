import React from 'react'
import { connect } from 'react-redux'
import * as userInfoActions from './../actions/userinfo.js'

let UserInfo = (props) => (
	<div>
		{props.userInfo.userId}
		<hr/>
		{props.userInfo.userCity}
	</div>
)
let handleData = {
	userId: '111',
	userCity: '223232'
}
let ChangeBtn =(props) => (
	<button onClick={e => props.handleClick(handleData)}>change</button>
)

class Hello extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		console.log('login')
		this.props.login({
			userId: 'abc',
			userCity: 'beijing'
		})
	}
	render() {
		return (
			<div>
				<p>hello world</p>
				<hr/>
				<UserInfo userInfo={this.props.usrInfo}/>
				<ChangeBtn handleClick= {this.props.update}/>
			</div>
		)
	}
}
const mapStateToProps  = state => {
	return {
		usrInfo: state.userInfo
	}
}

const mapDispatchToProps = dispatch => {
	return {
		login: data => {
			dispatch(userInfoActions.login(data))
		},
		update: data => {
			dispatch(userInfoActions.updateCityName(data))
		}
	}
}

let HelloContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(Hello)

export default HelloContainer
