//types : OPEN_URL, CONTROL
const cmdType = {
    TYPE_TEXT: "TYPE_TEXT",
    PAGE_UP: "PAGE_UP",
    PAGE_DOWN: "PAGE_DOWN",
    CONTROL: "CONTROL",  
    OPEN_URL: "OPEN_URL",
}
  
// EXAMPLES
const control = {
  	cmd:    "CONTROL",
  	deltaX: "10",
  	deltaY: "10",
    click:  "1",
}

const openUrl = {
    cmd: "OPEN_URL",    
    url: 'google.com',
}

const pageUp = {
	cmd: "PAGE_UP",
}

const pageDown = {
	cmd: "PAGE_DOWN",
}

const pageDown = {
    cmd: "TYPE_TEXT",
    char: 'a'
}
