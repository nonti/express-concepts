import cors from 'cors';

const configureCors = () => {
  return cors({
        // origin this will tell that which origin you want user can access your api
        origin: (origin, callback) => {
          const allowedOrigins = [
            'http://localhost:3000', //local dev
            'https://yourcustomdomain.com' //production domain
          ]

          if(!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true) // giving permission so that req can be allowed
          }else {
            callback(new Error('Not allowed by CORS'))
          }
        },

        methods : ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: [
          'Content-Type',
            'Authorization',
            'Accept-version',
        ],
        exposedHeaders:[
          'Content-Range', 'X-Total-Count'
        ],
        credentials: true, //enable support for cookies
        preflightContinue: false,
        maxAge:600, //cache preflight responses for 10 minutes -> avoid sending options multiple times
        optionsSuccessStatus: 204 // some legacy browsers (IE11, various SmartTVs) choke on 204
    });
}

export default configureCors;