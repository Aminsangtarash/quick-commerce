
import axiosRoot from 'axios';

const axios = axiosRoot.create({
    baseURL: process.env.QC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMSIsImp0aSI6IjUyODJiZGY5ZGMzMTRmZGFiMmE0ZTMwZjY1YTYwZjNkZWJjY2Y5MzdlNmExNGQxZWQwMzQwZGQ0ZDc0Mjg1Y2I0M2EzYjhjNGE0Mzg3ZmNhIiwiaWF0IjoxNzU0OTg0NzkwLjA3NjQ2MiwibmJmIjoxNzU0OTg0NzkwLjA3NjQ2OCwiZXhwIjoxNzg2NTIwNzkwLjA1MDIyNSwic3ViIjoiMjA4NzQxODUiLCJzY29wZXMiOltdLCJ1c2VyX2lkIjoyMDg3NDE4NX0.V2k9u2osRh_2sPX-srpLY0pv2FbfO28TjrmbghY2j4XEsSe7XO7Tr_UUF435LXUEzopJ0tPSrSN2sU56U1R3NzYIRYEFmnbP3-4ySPispiiwyiCI0_7OJhIpU9v8fk1nHkOBVIT8VgEO6TP4mDAMS1rWkt9TvXp90MIj9lEqgwSkrcgqo4CdFgNQs6QGkXXp6iYuyfd7AvH_WBgZsGSaA6LwQ3bBHTtI89IEr_XgA5gSGX-o3FmUtFq1p58tefctvQJ9UDYiXA1wO8-fAOyRfBsgeMrSb8wlWyBF71BsZObi94HH7hCAba1hqKQCfpWfnjPn8KITzzQ9FN-xTgXv4OW6a98JLHpDBPcQ3nRxLIK5y2jktbZdOKWcW7RDwjqk0bfLqCYfbO67KJBTV-HTHTdh2arAGa4b2nlt3U2IkKd6oTxUgmXpp8XvqYSq3jP5wW-vlnVnj93axW9Aj3QHyoMS2Ka5e7U94FFfGfx--loOJIIRXntPUrSf6WWFMDqJM03d4MnnoVVf07h0rnw_IqnFdQj-HC79Shmad4eV73uAdyoTwixhTxCe1qSNT7cBee4TBrOnlaM5HDtpZOPJPc7g316hpE5gcOIshBXu0pJ2ziiu3RPZ7KZpo2WMACdjfoREALEcyM6PWpQnYYe3hMJ8Om3X013fJWai1KJR9uQ'
    },
});

axios.defaults.withCredentials = true

axios.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.status === 401) {
        }
        if (error.response) {
        } else {
        }
        throw error
    }
);

export default axios;  