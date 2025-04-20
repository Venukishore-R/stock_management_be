# Stock Management Backend

A backend API service for managing stock inventory, built with Node.js and Express.

## Features

- RESTful API endpoints for managing stock items
- Modular architecture with clear separation of concerns
- Environment-based configuration using `.env`

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: JavaScript

## Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (v6 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Venukishore-R/stock_management_be.git
   ```

2. Navigate to the project directory:

   ```bash
   cd stock_management_be
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:

   ```env
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=root
   DB_NAME=stock_management
   PORT=3000
   ```

### Running the Application

Start the server:

```bash
npm start
```

The server will be accessible at `http://localhost:3000/` by default.

## Project Structure

```plaintext
stock_management_be/
├── config/             # Configuration files
├── endpoints/          # API route definitions
├── handlers/           # Request handlers/controllers
├── internal/           # Internal utilities and services
├── node_modules/       # Node.js packages
├── .env                # Environment variables
├── app.js              # Application entry point
├── package.json        # Project metadata and scripts
├── package-lock.json   # Dependency lock file
└── README.md           # Project documentation
```

## API Endpoints

| Method | Endpoint      | Description                |
| ------ | ------------- | -------------------------- |
| GET    | /api/prodcuts | Retrieve all product items |
| POST   | /api/product  | Create a new product item  |
| GET    | /api/product/ | Retrieve a specific item   |
| PUT    | /api/product/ | Update a specific item     |
| DELETE | /api/product/ | Delete a specific item     |
| GET    | /api/stocks/  | Get all stock items        |
| PUT    | /api/stock/   | Sell stock                 |

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the [MIT License](LICENSE).
