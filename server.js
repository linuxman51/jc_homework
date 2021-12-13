//Setting up constants and modules
const express = require('express');
const bodyParser = require('body-parser');

//setting variables
var fs = require('fs');
var request = require('request');
var http = require('http');
var app = express();
app.use(bodyParser.json());
var result;
var content;

//quick and dirty function to download the remote file's contents and display back to requesting browser
function read_site(res) {
request.get('https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt', function (error, response, site_content) {
    if (!error && response.statusCode == 200) {   //checking to make sure it actually pulled down correctly
        res.send(site_content);  //sending data back to requestor using the response variable from the request
        console.log("output::",error, response.statusCode, "\n", site_content)  // console output for troubleshooting, etc.
    };
})
    return {content};
}

//quick and dirty function to download the remote file and store it locally, most of the above was reused but instead of sending
//a response back to the requestor, we're writing out to the sample-text-file.txt in the working directory.
function download_site(req,res) {
    request.get('https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt', function (error, response, site_content) {
        if (!error && response.statusCode == 200) {
            fs.writeFile('sample-text-file.txt',site_content,
                function(err) {
                    if (err) throw err;
                console.log("Downloading file, output::",error, response.statusCode, "\n", site_content)});
        };
    })
        return {content};
}

//input checking and some error handling (though not comprehesive)
//most of this is self-explanatory in nature, simple http get commands won't include the
//json payload, but just in case I'm trying catch all of those here and handle that somewhat elegantly
app.get('/', function (req,res) {
res.send('wrong endpoint');
return;
})

app.get('/manage_file', function (req,res) {
res.send('No command recieved');
return;
})

//handling post inputs. Ran into an issue catching invalid json inputs, even with a try-catch block they got caught before
//I could set up a handler to deal with that scenario. Here, we set it up to only respond to action read and download
//present an error to the end user and the console if action is missing, or if read and download are missing but action is there
app.post ('/manage_file',function (req, res) {
        if (req.body.action == 'download') {
            download_site(req,res);
            console.log("Recieved download command: %s",req)
            return;
        }
        if (req.body.action == 'read') {
            console.log("Recieved read command: %s",req);
            read_site(res);
            return;
        }
        if (req.body.action != 'download' || req.body.action != 'read')
        {
            res.send('Invalid command/value, supported commands are action read or action download');
            console.log ("Invalid command recieved: %s", req);
            return;
        }

    })
//bottom catch-all for anything not /manage_file either via get or post
app.get('/*', function (req,res) {
res.send('wrong endpoint');
return;
})

app.post('/*',function (req,res) {
res.send('wrong endpoint');
return;
})


//the very basic run routine for this, would be much better to tie it to a specific address/interface
//but without knowing ahead of time, listening on all available on port 80 works too if not very ugly.
var server = app.listen(80 , function () {
    var host = server.address().address
    var port = server.address().port
    //outputting the address and port to the console
    console.log("Example app listening at http://%s:%s", host, port)
 })
