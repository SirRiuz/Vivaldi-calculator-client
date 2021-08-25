
const {app,BrowserWindow} = require('electron')


var win = null


app.on('ready',() => {
    win = new BrowserWindow({
        width:335,
        height:700,
        //resizable:true
    })
    //win.removeMenu()
    win.loadFile(__dirname+'/view/index.html')
})



