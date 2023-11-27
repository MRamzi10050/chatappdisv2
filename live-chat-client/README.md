# chatappdisv2

1- when opening the codebase folder in VS code, navigate to both client and server folders
make sure to open 2 cmd prompts 
  cd live-chat-client
  cd live-chat-server
  
2- after which enter this prompt into each cmd (using git bash is best)
  npm install
  
3- after all the packages are downloaded kindly download this package as well
  npm install nodemon
  
4- you don't need to change anything regarding the DB simply run this command first in server side
  npm start
  
5- then in client side same command
  npm start
  
6- you can use the application freely but keep in mind for video calling you will need your own token generated from agoraRTC for it only works for 24 hours.


in case your browser does not support some components kindly press windows+R to open run and add this then press run
chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security

run the app using the opened chrome tab
