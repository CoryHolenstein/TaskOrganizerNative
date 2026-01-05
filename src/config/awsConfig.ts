// AWS Configuration - Not used yet, using mock data instead
// TODO: Configure when ready to integrate AWS Amplify

export const config = {
  auth: {
    userPoolId: process.env.REACT_APP_USER_POOL_ID || 'YOUR_USER_POOL_ID',
    userPoolClientId: process.env.REACT_APP_USER_POOL_CLIENT_ID || 'YOUR_USER_POOL_CLIENT_ID',
    region: process.env.REACT_APP_REGION || 'us-east-1',
  },
  api: {
    endpoint: process.env.REACT_APP_API_ENDPOINT || 'YOUR_API_GATEWAY_ENDPOINT',
  },
};
