# Viaplay trailer API

This API provides an endpoint for getting movie trailer based on url from Viaplay Content API.

# Technologies/frameworks used

This API runs on NodeJS as a platform with the help from:
- HapiJS (server framework for robust and reliable applications and services)
- Request (simple HTTP client)
- Bluebird (full featured promise library)
- XML2JS (library for parsing XML content)
- Lab (framework for testing HapiJS applications)
- Code (BDD assertion library)

# Build, test and run

Install dependencies:
```
npm install
```
Tests using Lab:
```
npm test
```
Start server:
```
npm start
```

API is reachable at http://localhost:8000/trailers/movie_url to test your own query, for example (Lucy 2014):
http://localhost:8000/trailers/https%3A%2F%2Fcontent.viaplay.se%2Fweb-se%2Ffilm%2Flucy-2014

Troubleshooting running tests - if for some reason 'npm test' fails to start it might be the case that Lab is not installed globally so 'npm install -g lab' might help
