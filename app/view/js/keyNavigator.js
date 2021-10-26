



function onClickButton() {

  /*
    Esta funcion se encarga de los eventos que ocurren
    cuando preciono cualquier boton que se muestra
    en la pantalla
  */

  const btnsItemsList = document.getElementsByClassName('btn-item')
  const basicOperationsList = document.getElementsByClassName('btn-item-opacity')

  
  for(var x=0;x<=btnsItemsList.length;x++) {
    
    if(btnsItemsList[x] != undefined){
      btnsItemsList[x].addEventListener('click',(e) => {
                
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
          mode:'deg'
        },(e) => {
          if(e.data.status == 'ok') {
            document.getElementById('show').style.display = 'block'
            document.getElementById('result').innerText = `=${e.data.latex}`

          }
        })
      })
    }
  }

  for(var x=0;x<=basicOperationsList.length;x++) {

    if(basicOperationsList[x] != undefined){
      basicOperationsList[x].addEventListener('click',(e) => {

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
          mode:'deg'
        },(e) => {
          if(e.data.status == 'ok') {
            document.getElementById('show').style.display = 'block'
            document.getElementById('result').innerText = `=${e.data.latex}`
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
        mode:'deg'
      },(e) => {
        if(e.data.status == 'ok') {
          document.getElementById('show').style.display = 'block'
          document.getElementById('operation').innerText = e.data.latex
          document.getElementById('result').style.display = 'none'
        } else {
          if(e.data.result['type-error'] == 'syntax.error') {
            document.getElementById('operation').innerText = 'Error_en_la_sintaxis'
            document.getElementById('result').innerText = ''
          }

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
      if(e.target.attributes.orientation.nodeValue == 'left') {
        document.getElementById('operation').executeCommand('moveToPreviousChar');
      } else {
        document.getElementById('operation').executeCommand('moveToNextChar');
      }
    })
  }
}



function onDelete(){
  
  var el = document.getElementById('btn-item-back')
  el.addEventListener('click',() => {
    document.getElementById('operation').executeCommand('deleteBackward')
  })
}




onCalculate()
onClickButton()
onDelete()
onNavigation()




