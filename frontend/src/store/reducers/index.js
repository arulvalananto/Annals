import { combineReducers } from 'redux';

import authReducer from './auth.reducer';
import loaderReducer from './loader.reducer';
import journalsReducer from './journals.reducer';
import ideasReducer from './ideas.reducer';
import personalReducer from './personal.reducer';
import dashboardReducer from './dashboard.reducer';

export default combineReducers({
    loader: loaderReducer,
    auth: authReducer,
    journals: journalsReducer,
    ideas: ideasReducer,
    personal: personalReducer,
    dashboard: dashboardReducer,
});
