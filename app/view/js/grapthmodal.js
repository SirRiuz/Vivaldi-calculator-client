



class ModalController {

  constructor(modeRender){
    this.modeRender = modeRender
  }

  closeModal() {
    document.getElementById('screen-modal-m').addEventListener('click',(e) => {
      document.getElementById('grapth-canvas-modal-3d').style.display = 'none'
    })
  }
  
  openGraphModal(){
    document.getElementById('canvas-3d-preview').style.backgroundImage = 'none'
    document.getElementById('show').style.display = 'none'
    document.getElementById('result').textContent = '\\,'

    document.getElementById('canvas-3d-preview').innerHTML = `<body><div class="loading-spinner"></div> </body>`
    document.getElementById('grapth-canvas-modal-3d').style.display = 'block'

    document.getElementById('canvas-3d-preview').style.display = 'flex'
    document.getElementById('canvas-3d-preview').style.justifyContent = 'center'
    document.getElementById('canvas-3d-preview').style.alignItems = 'center'

        
    onGrapth3d({
      latex:document.getElementById('operation').value,
      mode:this.modeRender
    },(e) => {

      console.log('e ->',e)
      if(e != null){
        document.getElementById('canvas-3d-preview').innerHTML = ''
        document.getElementById('canvas-3d-preview').style.display = 'block'
        document.getElementById('result').innerText = ''  
  
        var el = document.getElementById('canvas-3d-preview')
        el.style.backgroundImage = `url(data:image/png;base64,${e.baseCode})`
        el.style.backgroundRepeat = 'no-repeat'
        el.style.backgroundPosition = 'center'
        el.style.backgroundSize = 'contain'
  
        document.getElementById('grapth-canvas-modal-3d').style.display = 'block'   
      } else {
        document.getElementById('grapth-canvas-modal-3d').style.display = 'none'
        document.getElementById('result').innerText = `\\,\\,`
        document.getElementById('operation').innerText = 'Error\\,\\,en\\,\\,el\\,\\,servidor'
      }
    })

  }

}



function closeModal() {
  document.getElementById('screen-modal').addEventListener('click',(e) => {
    document.getElementById('grapth-canvas-modal').style.display = 'none'
  })
}


function openGraphModal() {

  document.getElementById('result').innerText = ''  

  document.getElementById('operation').innerText = document.getElementById('operation').value
  onParseLatex(document.getElementById('operation').textContent,(latex) => {
    document.getElementById('grapth-canvas-modal').style.display = 'block'
    grath(latex.parse)
  })  
}



closeModal()
new ModalController().closeModal()


