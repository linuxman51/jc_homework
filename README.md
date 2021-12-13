README for Server.js v0.0.1

Quick requirements:

node.js v16.13.1 (may work on earlier versions)

Express parser (current)



Abstract:

The stated purpose for this exercise was to create a http endpoint that listens for commands on /manage_file

If the payload "action" : "download" is sent, download a file at a given url (specified in the instructions) and store
it locally. Since locally has many meanings, I took this to mean locally on the server.

if the payload "action" : "read" is sent, display the contents of the same url back to the end user. 
The language choice/framework was left to the author's discretion, so to that end, I chose node.js for several reasons, mostly personal, but also with consideration to what's being asked:

-Node.js already has a fairly full http error stack built in, so this cut down on things I needed to worry  
    about

-It's got great JSON parsing abilities for reasons that ought to be obvious.

-It is a language that I've seen referenced in several different areas and on various platforms, and as such
    should be fairly cross-platform compliant (BIG IP has an implementation, for instance) making portability less of a headache

-It is a language that I have not had any hands-on experience with prior to this exercise, so I wanted to
    branch out a bit

Installation (on amazon linux 2):

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash

. ~/.nvm/nvm.sh

nvm install node

npm install express

npm install request

copy/git pull serve.js down to /root (yes we embraced poor security for this)

from /root run:

node server.js


Tested on:

AWS, T3 Nano running Amazon Linux 2

Windows 10 home edition (With some minor path changes)


Some items being worked on but ran out of time to finish:

Daemonizing the server process so it could be started and stopped via systemctl (and would have come with a shell script to run the install and start the process right off the bat via user-data in AWS)

and along that same thought process, writing out the log to an actual log file instead of the console.. was working on overriding console.log but didn't quite get all of the nuances of that worked out.


Files in this repo:

server.js (server applet)

readme.md (this file)

api.http (test cases used with VSC pluggin to send commands/json to the server)


addendum:
I was able to run this locally on my machine as well (referenced above as the windows 10 box) with the windows binary installer of node.js, the above mentioned modules, and tested it locally with the REST client for visual studio code (which is what will use the api.http file). 
