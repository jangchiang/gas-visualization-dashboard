#!/bin/bash
echo "Starting deployment..."
cd gas-visualization-dashboard

echo "Pulling from git..."
git pull

echo "Installing dependencies..."
npm install

echo "Building application..."
npm run build

echo "Restarting PM2..."
pm2 restart gas-visualization-dashboard

echo "Deployment completed!"
