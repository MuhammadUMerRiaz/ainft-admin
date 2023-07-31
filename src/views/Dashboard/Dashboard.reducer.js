import { GET_DASHBOARD_STATS } from '../../redux/types';

const initialState = {
    dashboardStats: null,
    pizzaStats: null
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_DASHBOARD_STATS:
            return {
                ...state,
                dashboardStats: action.payload,
            }
        default:
            return {
                ...state
            }
    }
}