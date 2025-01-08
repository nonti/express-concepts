
const requestLogger =  (req, res, next) => {
  const timesStamp = new Date().toISOString();
  const method = req.method
  const url = req.url
  const userAgent = req.get('User-Agent');
  console.log(`[${timesStamp}] ${method} ${url} - ${userAgent}`);
  next();
};

export const addTimeStamp = (req, res, next) => {
  req.timeStamp = new Date().toISOString();
  next();
}

export default requestLogger;