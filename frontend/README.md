POST http://localhost:5050/api/v1/auth/signup
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "123456"
}

POST http://localhost:5050/api/v1/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "123456"
}