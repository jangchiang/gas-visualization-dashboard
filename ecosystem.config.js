module.exports = {
  apps: [{
    name: 'gas-visualization-dashboard',
    script: 'npm',
    args: 'start',
    env: {
      PORT: "3002",  // Changed to string
      NODE_ENV: 'production',
    },
  }]
};