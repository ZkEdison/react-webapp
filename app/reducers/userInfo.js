import * as actionTypes from '../util/constants/userinfo.js'

function userInfo(state = {}, action) {
	switch (action.type) {
		case actionTypes.USERINFO_LOGIN:
			return action.data
		case actionTypes.UPDATE_CITYNAME:
			return action.data
		default:
			return state
	}
}

export default userInfo
