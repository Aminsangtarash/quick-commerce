
import axiosRoot from 'axios';

const axios = axiosRoot.create({
    baseURL: process.env.QC_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxMSIsImp0aSI6IjgzODBiMGUxMGM5ZTYxMWM0NzE0NDU5ZWViZWMxNWU5MDQ3MTA5N2E3MDNmMDJhM2UwOGQ2NmUyYzM4YzlhN2U0Mjg1MWZlMzNjNjJkY2JlIiwiaWF0IjoxNzUyNjYzMzcxLjA3NDQ5NiwibmJmIjoxNzUyNjYzMzcxLjA3NDUwNCwiZXhwIjoxNzg0MTk5MzcwLjk0OTUyOSwic3ViIjoiMjA4NzQxODUiLCJzY29wZXMiOltdLCJ1c2VyX2lkIjoyMDg3NDE4NX0.jF8oMBPHjRvpgUyK6Cl9gDALYNutSURie9d6GR3KGJ-sV0-_GjfVfIfXEIFzNs3PCpGlBSQRRByH_KNEOocRrxuBoYHLvQ4NIqGMeZq0VdM6pRmw9WuQO0mMv6D8a6kaDRkAQ01eh3jcZkz89IR3yq1EKRP41FsnR_F4YGiQDK-YJGTxsydSudRGYBYLJrFz1pbukIaElV4Y8Udg0xieXiIl8rPRUCYtAysSLJr-YyXzlvzUrhXPT0XuBDpkuu7Q082lYeQoSg55jXkN0UJYtHsHjJJka3eK9nZnDdtRjdqbrB-q-r2iyBYeXGi5c5NZvk6WGK5uaP0o5BI12_u5p0DI5UZ8lIehInJ4IRbvoW6NMcZehCISV_CJlnUfN-Cl3bdbpuXrTz25VocpIXiTm4ZS3BtQ2R6hwYo0tsOSohpAOtxJKxSe2-Fyj7ofm1bCGYnUIus7ow-7t1fIk2LFk7YHwS-wHxacA_LILBwPivA0vvP2FtBmmXe0eZDvUB7i6oL3bNj6ZB0X-HpE3nrz_D1zYljS57Gi4pgkVoQ44IwxB1m1DDqJlYoeo_Bvmw6HgLo5ChnmtT7Hl39rfi5QWqa9vjPkYaDkBztFdr8Ph4JmqXh270TtpDUF9WjahKaud_7u7PDHVzSoho0_j1ytnsbG2d3opQXWwIRZqssRNzM'
    },
});

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