# Mini URL Shortener API

A simple backend project that shortens long URLs and allows redirection via short codes. Built with **Node.js**, **Express**, and **MongoDB**, following the **MVC structure** with clean validation and error handling.



## > Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- Shortid for code generation
- Custom middleware for:
  - Rate limiting
  - Error handling
  - Input validation


## > Features

- Shorten long URLs with a POST request
- Redirect to original URL using short code
- Optional expiry date for links (defaults to 7 days)
- Tracks number of clicks
- Built-in rate limiting
- Custom URL format validation



## Getting Started

### 1) Clone the Repository

```bash
git clone https://github.com/your-username/url-shortener-api.git
cd url-shortener-api
```



### 2) Install Dependencies
```bash
npm install
```

### 3) Create .env File
```bash
MONGO_URI=mongodb://localhost:27017/urlshortener
PORT=5000
```
Replace MONGO_URI with your MongoDB Atlas URI if using the cloud.

### 4) Start the Server
```bash
npm run dev   # Uses nodemon
# OR
npm start     # Standard node run
```

### Postman
 
Using the API with Postman
## 1. POST /shorten
URL: http://localhost:5000/shorten

Method: POST

Body: raw → JSON

## Example:
> json
```bash
{
  "url": "https://leetcode.com/problemset/",
  "expiry": "2025-08-01T00:00:00.000Z" // (optional)
}
```


> json
```bash
{
  "shortUrl": "http://localhost:5000/abc123",
  "expiresAt": "2025-08-01T00:00:00.000Z"
}
```

## 2. GET /:code
URL: http://localhost:5000/abc123

Method: GET

Behavior: Redirects to the original long URL

## Project Structure
```bash

url-shortener-api/
├── models/
│   └── Url.js
├── middleware/
│   ├── errorHandler.js
│   └── rateLimiter.js
├── utils/
│   └── validators.js
├── server.js
├── .env
├── .gitignore
└── README.md

```

## Notes
1) If expiry is not provided, link expires in 7 days by default.
All validations are implemented from scratch.

2) Rate limiting allows up to 100 requests per 15 minutes per IP.

>  Contribution
Feel free to fork, improve, and submit pull requests! For feature suggestions, raise an issue.
