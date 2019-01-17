var express = require('express');
var _router = express.Router();
var multer = require('multer');

var store = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, './uploads');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'.'+file.originalname);
    }
});

var upload = multer({storage:store}).single('file');

_router.post('/upload', function(req,res,next){
    upload(req,res,function(err){
            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', "*");

            //  // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            
            //  // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length");
            
            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            //  res.setHeader('Access-Control-Allow-Credentials', false);
            
        if(err){
            return res.status(501).json({error:err});
        }

        return res.json({originalname:req.file.originalname, uploadname:req.file.filename});
    });
});

_router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

_router.options("/*", function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Content-Length');
    res.send(200);
  });
  
module.exports = _router;