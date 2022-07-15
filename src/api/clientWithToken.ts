import axios from 'axios';

const withTokenOptions = {
  baseURL: process.env.REACT_APP_API_URL,

  headers: {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZGV2aWNlVG9rZW4iOiJhOTRmMDc2MS1lNmU5LTRhOGMtYTk3OS0wOWI4OWE1ZTA0Y2QiLCJ0d29GYWN0b3JQYXNzZWQiOmZhbHNlLCJpYXQiOjE2NTc2Mjg4NzYsImV4cCI6MTY4OTE2NDg3Nn0.sZUNpJ_V9rN6XVhujS-ep1hI9qYmxkTrpubf_9GPocI`,
  },
};

const clientWithToken = axios.create(withTokenOptions) as any;

export default clientWithToken;
