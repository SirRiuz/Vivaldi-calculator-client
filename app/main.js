
const {app,BrowserWindow} = require('electron')


var win = null


app.on('ready',() => {
    win = new BrowserWindow({
        width:540,
        height:715,
        //resizable:false
    })
    //win.removeMenu()
    win.loadFile(__dirname+'/view/index.html')
})



