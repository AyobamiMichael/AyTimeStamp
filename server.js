// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
const req = require('express/lib/request');

app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use("/public", express.static(__dirname + "/public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

 const timeObj = {}
 // Timestamp begins here
app.get('/api/:date_string', 
      (req, res)=>{
     var date_string = req.params.date_string;
        
       if(date_string.includes('-') || date_string.includes(' ') || date_string.includes(',')){
        const dateNew = new Date(date_string);
             timeObj['unix'] = dateNew.getTime();
             timeObj['utc'] = dateNew.toUTCString(); 

          
       }else{
        const intValue = parseInt(date_string);
        const dateObject = new Date(intValue);
        console.log(dateObject.toUTCString());
     
         timeObj['unix'] = intValue;
         timeObj['utc'] = dateObject.toUTCString();
                 
       }
       if(!timeObj['unix'] || !timeObj['utc']){
          res.json({error:"Invalid Date"});
        }
        res.json(timeObj);
      }
);

    app.get("/api", (req, res)=>{
            const timeNow = new Date();
          
           timeObj['unix'] = timeNow.getTime();
           timeObj['utc'] = timeNow.toUTCString();
           res.json(timeObj);
    });
   
// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

