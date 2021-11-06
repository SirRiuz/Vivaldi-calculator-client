




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
      //onRequest('','eval')
      document.getElementById('operation').innerText = document.getElementById('operation').value


      onRequest({
        latex:document.getElementById('operation').textContent,
        operation:getOperation(),
        mode:document.getElementById('btn-deg-mode').attributes.mode.value
      },(e) => {
        if(e.datblocka.status == 'ok') {
          document.getElementById('show').style.display = 'none'
          document.getElementById('operation').innerText = e.data.latex
          document.getElementById('result').style.display = 'none'
        } else {
          if(e.data.result['type-error'] == 'syntax.error') {
            document.getElementById('operation').innerText = 'Error_en_la_sintaxis'
            document.getElementById('result').innerText = ''          }

          if(e.data.result['type-error'] == 'zero.division') {
            document.getElementById('operation').innerHTML = 'No es posible dividir entre 0'
            document.getElementById('result').innerText = ''
          }
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
  
  var el = document.getElementById('btn-item-back')
  var clearAll = document.getElementById('clear-all')

  el.addEventListener('click',() => {
    document.getElementById('operation').focus()
    document.getElementById('operation').executeCommand('deleteBackward')
    document.getElementById('result').innerText = `\\, \\, `
    document.getElementById('show').style.display = 'none'
  })


  clearAll.addEventListener('click',() => {
    document.getElementById('operation').focus()
    document.getElementById('operation').value = ''
    document.getElementById('result').value = ''
    document.getElementById('show').style.display = 'none'
  })


  
}




onCalculate()
onClickButton()
onDelete()
onNavigation()




