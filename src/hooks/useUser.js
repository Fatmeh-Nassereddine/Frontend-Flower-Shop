// // useUser.js
// import { useQuery } from '@tanstack/react-query';
// import axios from 'axios';

// const fetchUser = async () => {
//   const token = sessionStorage.getItem('token');
//   if (!token) {
//     throw new Error('No token found');
//   }

//   const response = await axios.get('http://localhost:5000/api/user', {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   return response.data;  // Assuming the response contains the user data
// };

// export const useUser = () => {
//   return useQuery('user', fetchUser, {
//     // Retry logic or error handling can be added here
//     onError: (error) => console.log(error),
//   });
// };
