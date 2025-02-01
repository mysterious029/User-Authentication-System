import axios from "axios";
import store from '../redux/store/store';


export const postData = async (payload, type) => {
    let res;
    let url;
    switch (type) {
      case 'Register':
        url = `${process.env.REACT_APP_URL}/register`;
        break;
      case 'UploadUserImage':
        url = `${process.env.REACT_APP_URL}/upload`;
        break;
      case 'Login':
        console.log( `${process.env.REACT_APP_URL}/login`,"called")
        url = `${process.env.REACT_APP_URL}/login`;
        break;
      case 'Verfiy':
        url = `${process.env.REACT_APP_URL}/verify-otp`;
        break;
      case 'ForgetPassword':
        url = `${process.env.REACT_APP_URL}/forgot-password`;
        break;
      case 'ResetPassword':
        url = `${process.env.REACT_APP_URL}/reset-password`;
        break;
      case 'UpdateProfile':
        url = `${process.env.REACT_APP_URL}/updateProfile`;
        break;
      case 'CheckUsernameAvailability':
        url = `${process.env.REACT_APP_URL}/CheckUsernameAvailability`;
        break;
      default:
        return 'error'; 
    }
  
    let status;

    console.log(payload,"called for login")
    try {
    
      const apiResponse = type === 'UpdateProfile' ? await axios.put(url, payload) : await axios.post(url, payload);
      res = apiResponse;
      status = apiResponse; 
    } catch (error) {
      if (error.response.status === 400) {
        
        const errorMsg = error.response?.data?.msg || error.response?.data?.message;
        status = 'error';
        store.dispatch(errorMsg);
      } else if (error.response.status === 404) {
       
        const errorMsg = error.response?.data?.msg || error.response?.data?.message;
        status = 'error';
        store.dispatch(errorMsg);
      } else {
        status = 'error';
        store.dispatch('An unexpected error occurred');
      }
    }
    return type === 'UploadUserImage' | type === 'UpdateProfile' ? res.data : status;
    
  };

