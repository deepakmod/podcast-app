import { configureStore } from '@reduxjs/toolkit';

import userReducer from './slices/userSlice';
import responsiveReducer from './slices/responsiveSlice'
import podcastReducer from './slices/podcastSlice';
export default configureStore({
    reducer: {
        user: userReducer,
        responsive: responsiveReducer,
        podcasts: podcastReducer,
    },
});