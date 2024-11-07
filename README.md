# DigiUsher Price Comparison Tool

The DigiUsher Price Comparison Tool is a powerful application designed to help users compare prices across various cloud platforms.

## Features

- **Multi-platform Support**: Compare prices from a variety cloud platforms.
- **Real-time Updates**: Get the latest prices and deals.
- **User-friendly Interface**: Easy to navigate and use.

## Prerequisites

- Docker

## Setup Instructions

### Using Docker

1. **Clone the Repository**

   ```bash
   https://github.com/Hasn-Khan/price-comparison.git
   cd price-comparison
   ```

2. **Build the Docker Image**

   Ensure Docker is running on your machine, then build the Docker image:

   ```bash
   docker-compose build
   ```

3. **Run the Application**

   Start the application using Docker Compose:

   ```bash
   docker-compose up
   ```

   The application should now be running.
   You can access the backend at `http://localhost:8000`
   You can access the frontend at `http://localhost:3000`

   We are using Postgresql as database

4. **Stop the Application**

   To stop the application, press `Ctrl+C` in the terminal where the application is running, or run:

   ```bash
   docker-compose down -v
   ```


## Configuration

- **Environment Variables**: Configure your environment variables in the `.env` file. This file should include API keys, database credentials, and other sensitive information.

## Common Issues Fix
If backend server doesn't start at first you can go to the docker descktop and manually rerun the backend/web container again. It will fix the issue.
