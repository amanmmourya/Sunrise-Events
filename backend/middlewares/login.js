export default function saveUrl(req,res,next){
    if(req.originalUrl){
      res.locals.redirectUrl=req.session.redirectUrl;
    }
     next(); 
  }