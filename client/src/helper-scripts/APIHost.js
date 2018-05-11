var APIHost;

if (process.env.NODE_ENV === 'production') {
  APIHost = "https://bart-now.herokuapp.com";
} else {
  APIHost = "http://localhost:8080";
}

module.exports = APIHost;