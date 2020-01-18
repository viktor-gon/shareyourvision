
//Control types
const cmdType = {
  TYPE_TEXT: "TYPE_TEXT",
  PAGE_UP: "PAGE_UP",
  PAGE_DOWN: "PAGE_DOWN",
  CONTROL: "CONTROL",  
  OPEN_URL: "OPEN_URL",
}

const { exec } = require('child_process');

const cors = require('cors');
const express = require('express');
const app = express();

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 204
}

app.use(cors(corsOptions));

let cursorPosX = 0;
let cursorPosY = 0;

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => {   
  return res.send('It Works!');
});

app.post('/', (req, res) => {    
  const {cmd, url} = req.body;

  //console.log('post:', req.body, cmd);

  if (cmd === cmdType.CONTROL) {
    const {deltaX, deltaY, click} = req.body;

    if (deltaY && deltaY) {
      moveDeltaXY(deltaX, deltaY);
    }

    if (click) {
      mouseClick();
    }
  }

  if (cmd === cmdType.OPEN_URL) {  
    openURL(url);
  }

  if (cmd === cmdType.TYPE_TEXT) {  
    const {char} = req.body;
    typeText(char);
  }

  if (cmd === cmdType.PAGE_UP) {     
    pageUp();
  }  

  if (cmd === cmdType.PAGE_DOWN) {      
    pageDown();
  }    

  return res.send('done:' + cmd);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
  getMousePosition();
});

const pageUp = (char) => {  
  exec(`xdotool key Page_Up`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

const pageDown = (char) => {  
  exec(`xdotool key Page_Down`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

const typeText = (char) => {
  let cmd = 'type';

  if (char === ' ') {
    char = "space";
    cmd = "key";
  }

  if (char === 'backspace') {
    char = "BackSpace";
    cmd = "key";
  }  

  exec(`xdotool ${cmd} ${char}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}


const getMousePosition = () => {
  exec(`xdotool getmouselocation`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
    const [xDot,yDot] = stdout.split(" ");
    const [text1,x] = xDot.split(":");
    const [text2,y] = yDot.split(":");
    cursorPosX = parseInt(x);
    cursorPosY = parseInt(y);
    console.log(x, y);
  });  
}

const mouseClick = () => {
  exec(`xdotool click 1`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

const scaleX = 1.6;
const scaleY = 1.6;

const moveDeltaXY = (deltaX, deltaY) => {
  cursorPosX += parseFloat(deltaX) * scaleX;
  cursorPosY += parseFloat(deltaY) * scaleY;

  if (cursorPosX < 0) {
    cursorPosX = 0;
  }

  if (cursorPosY < 0) {
    cursorPosY = 0;
  }
    
  exec(`xdotool mousemove ${cursorPosX} ${cursorPosY}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

//const browser = 'google-chrome';
const browser = 'chromium-browser';

const openURL = url => {
exec(`${browser} --incognito --new-window --start-fullscreen ${url}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }     
  });  
}