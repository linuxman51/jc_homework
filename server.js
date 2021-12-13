const express = require('express');
const bodyParser = require('body-parser');

var fs = require('fs');
var request = require('request');
var http = require('http');
var app = express();
app.use(bodyParser.json());
var result;
var content;
function read_site(res) {
request.get('https://www.learningcontainer.com/wp-content/uploads/2020/04/sample-text-file.txt', function (error, response, site_content) {
    if (!error && response.statusCode == 200) {
        res.send(site_content);
        console.log("output::",error, response.statusCode, "\n", site_content)
    };
})
    return {content};
}
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


app.get('/', function (req,res) {
res.send('wrong endpoint');
return;
})

app.get('/manage_file', function (req,res) {
res.send('No command recieved');
return;
})

app.post ('/manage_file',function (req, res) {
        if (!req.body.action) {
            res.send('Invalid command recieved: ' + req.body);
            console.log("Invalid command recieved: %s",req);
        }
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
            res.send('Invalid command, command was ' + req.body.action + '\nSupported commands are read and download');
            console.log ("Invalid command recieved: %s", req);
            return;
        }

    })

app.get('/*', function (req,res) {
res.send('wrong endpoint');
return;
})


var server = app.listen(80 , function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
 })
