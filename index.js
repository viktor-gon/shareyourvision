
//type : OPEN_URL, CONTROL
const cmdType = {
  TYPE_TEXT: "TYPE_TEXT",
  PAGE_UP: "PAGE_UP",
  PAGE_DOWN: "PAGE_DOWN",
  CONTROL: "CONTROL",  
  OPEN_URL: "OPEN_URL",
}

// EXAMPLES
// {
// 	"cmd":"CONTROL",
// 	"deltaX": "10",
// 	"deltaY": "10",
//  "click":  1,
// }

// {      
//     cmd: "OPEN_URL",  
//     url: 'google.com'
// }

const { exec } = require('child_process');

const cors = require('cors');
// const bodyParser = require('body-parser');
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

  console.log('post:', req.body, cmd);

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
    //const {char} = req.body;
    pageUp();
  }  

  if (cmd === cmdType.PAGE_DOWN) {  
    //const {char} = req.body;
    pageDown();
  }    

  return res.send('done:' + cmd);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
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

const mouseClick = () => {
  exec(`xdotool click 1`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

const moveDeltaXY = (deltaX, deltaY) => {
  cursorPosX += parseFloat(deltaX);
  cursorPosY += parseFloat(deltaY);

  if (cursorPosX < 0) {
    cursorPosX = 0;
  }

  if (cursorPosY < 0) {
    cursorPosY = 0;
  }

  console.log(cursorPosX, cursorPosY);
  
  exec(`xdotool mousemove ${cursorPosX} ${cursorPosY}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }      
  });  
}

const openURL = url => {
exec(`google-chrome --incognito --new-window --start-fullscreen ${url}`, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      return;
    }     
  });  
}

// const app = "data:text/html,<html><body><script>window.moveTo(580,240);window.resizeTo(800,600);window.location='https://sinoptik.ua/';</script></body></html>";

// exec(`google-chrome --incognito --new-window`, (err, stdout, stderr) => {
//     if (err) {
//       // node couldn't execute the command
//       return;
//     }
  
//     // the *entire* stdout and stderr (buffered)
//     console.log(`stdout: ${stdout}`);
//     console.log(`stderr: ${stderr}`);
//   });