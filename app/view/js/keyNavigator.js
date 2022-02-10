

function onClickKeyButton() {
  document.getElementById('operation').addEventListener('keypress',(e) => {
    if(!document.getElementById('operation').value == '') {
      onRequest({
        latex:document.getElementById('operation').value,
        operation:getOperation(),
        mode:document.getElementById('btn-deg-mode').attributes.mode.value
      },(e) => {
  
        if(e.status != 'error') {
          if(e.data.showSteps) {
            document.getElementById('show').style.display = 'block'
            document.getElementById('show-icon').setAttribute('mode',e.data.stepMode)
          }
          document.getElementById('result').innerText = `=${e.data.latex}`
        } else {
          document.getElementById('result').innerText = `\\, \\, `
          document.getElementById('show').style.display = 'none'
        }
      })
    }
  })
}


function onClickButton() {

  /*
    Esta funcion se encarga de los eventos que ocurren
    cuando preciono cualquier boton que se muestra
    en la pantalla
  */

  const btnsItemsList = document.getElementsByClassName('btn-item')
  const basicOperationsList = document.getElementsByClassName('btn-item-opacity')


  document.getElementById('btn-deg-mode').addEventListener('click',(e) => {
    if(e.target.attributes.mode.value == 'deg'){ 
      e.target.innerHTML = 'rad'
      e.target.attributes.mode.value = 'rad'
    } else {
      e.target.innerHTML = 'deg'
      e.target.attributes.mode.value = 'deg'
    }
    onRequest({
      latex:document.getElementById('operation').value,
      operation:getOperation(),
      mode:document.getElementById('btn-deg-mode').attributes.mode.value
    },(e) => {

      if(e.status != 'error') {
        if(e.data.showSteps) {
          document.getElementById('show').style.display = 'block'
          document.getElementById('show-icon').setAttribute('mode',e.data.stepMode)
        }
        document.getElementById('result').innerText = `=${e.data.latex}`
      } else {
        document.getElementById('result').innerText = `\\, \\, `
        document.getElementById('show').style.display = 'none'
      }

    })
  })


  
  for(var x=0;x<=btnsItemsList.length;x++) {
    
    if(btnsItemsList[x] != undefined){
      btnsItemsList[x].addEventListener('click',(e) => {

        document.getElementById('operation').focus()
                
        if(document.getElementById('result').style.display == 'none'){
          document.getElementById('result').style.display = 'block'
        }


        if(e.target.attributes.rendervalue){
          document.getElementById('operation').executeCommand(['insert', e.target.attributes.rendervalue.value]);
          //document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.attributes.rendervalue.value
        } else {
          document.getElementById('operation').executeCommand(['insert', e.target.textContent]);
          //document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.textContent
        }
      })
    }
  }

  for(var x=0;x<=basicOperationsList.length;x++) {

    if(basicOperationsList[x] != undefined){
      basicOperationsList[x].addEventListener('click',(e) => {

        document.getElementById('operation').focus()

        if(document.getElementById('result').style.display == 'none'){
          document.getElementById('result').style.display = 'block'
        }

        if(e.target.attributes.rendervalue){
          document.getElementById('operation').executeCommand(['insert', e.target.attributes.rendervalue.value]);
          //document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.attributes.rendervalue.value
        } else {
          document.getElementById('operation').executeCommand(['insert', e.target.textContent]);
          //document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.textContent
        }
      })
    }
  }

}


function onLongPress(element, callback) {
  let timer;

  element.addEventListener('touchstart', () => { 
    timer = setTimeout(() => {
      timer = null;
      callback();
    }, 500);
  });

  function cancel() {
    clearTimeout(timer);
  }

  element.addEventListener('touchend', cancel);
  element.addEventListener('touchmove', cancel);
}



function onCalculate() {

  /*
    Esta se encarga de los eventos cuando 
    se presiona o se mantene presionado el 
    boton igual (=)
  */
 

  const button = document.getElementById("btn-item-opacity-equals");
  let mousedownTime;

  onLongPress(button,() => {
    openModal(document.getElementById('modal-container'))
  })
  //document.getElementById('result').style.display = 'block'


  button.addEventListener('long-press',(e) => {
    openModal(document.getElementById('modal-container'))
  })
  
  button.addEventListener('mousedown', () => { mousedownTime = new Date().getTime(); });
  button.addEventListener('mouseup', () => {

    const mouseupTime = new Date().getTime(), timeDifference = mouseupTime - mousedownTime;


    if(timeDifference >= 400) {
      openModal(document.getElementById('modal-container'))
    } else {

      document.getElementById('load-modal').style.display = 'block'
      document.getElementById('show').style.display = 'none'
      document.getElementById('operation').innerText = document.getElementById('operation').value

      onRequest({
        latex:document.getElementById('operation').textContent,
        operation:getOperation(),
        mode:document.getElementById('btn-deg-mode').attributes.mode.value
      },(e) => {
        document.getElementById('load-modal').style.display = 'none'
        

        if(e != null){
          if(e.status != 'error'){
            if(e.data.showSteps != undefined && e.data.showSteps){
              document.getElementById('show').style.display = 'block'
              document.getElementById('show-icon').setAttribute('mode',e.data.stepMode)
            }
            document.getElementById('result').innerText = `=\\,\\,${e.data.latex}`
          } else{
            document.getElementById('result').innerText = `\\,\\,`
            document.getElementById('operation').innerText = 'No\\,\\,se\\,\\,puede\\,\\,resolver'
          }
        } else {
          document.getElementById('result').innerText = `\\,\\,`
          document.getElementById('operation').innerText = 'Error\\,\\,de\\,\\,conexión'
        }
      })
    }
  });
}



function onNavigation() {
  var results = document.getElementsByClassName('btn-item-nav')

  
  for(var x = 0;x<results.length;x++){
    results[x].addEventListener('click',(e) => {
      document.getElementById('operation').focus()

      if(e.target.attributes.orientation.nodeValue == 'left') {
        document.getElementById('operation').executeCommand('moveToPreviousChar');
      } else {
        document.getElementById('operation').executeCommand('moveToNextChar');
        document.getElementById('operation').executeCommand('nextSuggestion');
      }
    })
  }
}



function onDelete(){
  document.getElementById('btn-item-back').addEventListener('click', _ => {
    document.getElementById('operation').focus()
    document.getElementById('operation').executeCommand('deleteBackward')
    document.getElementById('result').innerText = `\\, \\, `
    document.getElementById('show').style.display = 'none'
  })
}



function clearAll(){
  document.getElementById('operation').focus()
  document.getElementById('operation').value = ''
  document.getElementById('result').value = ''
  document.getElementById('show').style.display = 'none'
}




function onClickTabButton(tabName,element){


  // Se encarga de cambiar el indicador de tab segun el boton
  // que precionemos


  var el = document.getElementById('nav-buttons-container')
  var tabCtx = null

  for(var x = 0;x<el.children.length;x++) {
    el.children[x].attributes['focus'].value = 'false'
    el.children[x].innerHTML = tabs[x]['svg']
  }

  element.attributes['focus'].value = 'true'

  for(var x = 0;x<el.children.length;x++) {
    if(el.children[x].attributes['focus'].value == 'true'){
      el.children[x].innerHTML = `<div>${tabs[x]['svg']}</div><div id="indicator-tab"></div>`
      tabCtx = {
        'ctx':tabs[x],
        'index':x
      }
      break
    }
  }


  const fragmentsContainers = document.getElementsByClassName('tab-fragment-container')

  for(var x=0;x<fragmentsContainers.length;x++){
    for(var y=0;y<fragmentsContainers[x].children.length;y++){

      fragmentsContainers[x].children[y].setAttribute('onClick','')
      
      if(tabCtx.ctx.buttons[x][y].id != undefined){
        fragmentsContainers[x].children[y].setAttribute('class',tabCtx.ctx.buttons[x][y].id)
        fragmentsContainers[x].children[y].setAttribute('id',tabCtx.ctx.buttons[x][y].id)
        fragmentsContainers[x].children[y].setAttribute('renderValue',tabCtx.ctx.buttons[x][y].renderItem)
        fragmentsContainers[x].children[y].setAttribute('onClick',tabCtx.ctx.buttons[x][y].onClick)
      }

      if(tabCtx.ctx.buttons[x][y].color != undefined){
        fragmentsContainers[x].children[y].style.background = tabCtx.ctx.buttons[x][y].color
      }
      
      if(fragmentsContainers[x].children[y].attributes['renderValue'] != undefined){
        fragmentsContainers[x].children[y].attributes['renderValue'].value = tabCtx.ctx.buttons[x][y].renderItem
      }
  
      fragmentsContainers[x].children[y].innerHTML = tabCtx.ctx.buttons[x][y].svg

    }
  }

}


function navController() {

  const items = document.getElementsByClassName('btn-nav')

  for(var x = 0;x<items.length; x++){
    items[x].addEventListener('click',(e) => {
      if(e.target.localName == 'svg'){
        onClickTabButton(
          e.target.parentElement.attributes[2].value,
          e.target.parentElement
        )
      } else {
        onClickTabButton(e.target.attributes[2].value,e.target)
      }
    })
  }
}



onCalculate()
onClickButton()
onDelete()
onNavigation()
navController()
//onClickKeyButton()



