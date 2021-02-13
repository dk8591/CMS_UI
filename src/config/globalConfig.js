import API_PATH from './apiPath';

const API_ENV = process.env.NODE_ENV && process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';

const Settings = {
	API_ROOT: API_PATH[API_ENV].API_ROOT
};
export default Settings;
