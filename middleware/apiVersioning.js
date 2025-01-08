import { version } from "react";

const urlVersioning = (version) => (req, res, next) =>{
  if(req.path.startsWith(`/api/${version}`)){
    next();
  }else{
    res.status(400).json({
      success: false,
      error: 'API version is not supported' 
    })
  }
};

const headerVersioning = (version) => (req, res, next) => {
  if(req.get('Accept-version')){
    next();
  }else {
    res.status(400).json({
      success: false,
      error: 'API version not provided in the request header' 
    })
  }
}

const contentTypeVersioning = (version) => (req, res, next ) => {
  const contentType = req.get('Content-Type');
  if(contentType &&  contentType.includes(`application/vnd.api.v${version}+json`)){
    next();
  }else{
    res.status(400).json({
      success: false,
      error: 'Content-Type is not in the correct format' 
    })
  }
}

export { urlVersioning, headerVersioning, contentTypeVersioning };