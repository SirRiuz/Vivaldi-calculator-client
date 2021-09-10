


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
        if(e.target.attributes.rendervalue){
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.attributes.rendervalue.value
        } else {
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.textContent
        }
        onRequest({
          latex:document.getElementById('operation').textContent,
          operation:'eval',
          mode:'deg'
        },(e) => {
          if(e.data.result.status == undefined) {
            console.log(e.data.result)
            document.getElementById('result').innerText = `=${e.data.result}`
          }
        })
      })
    }
  }

  for(var x=0;x<=basicOperationsList.length;x++) {
    if(basicOperationsList[x] != undefined){
      basicOperationsList[x].addEventListener('click',(e) => {
        if(e.target.attributes.rendervalue){
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.attributes.rendervalue.value
        } else {
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.textContent
        }

        onRequest({
          latex:document.getElementById('operation').textContent,
          operation:'eval',
          mode:'deg'
        },(e) => {
          if(e.data.result.status == undefined) {
            console.log(e.data.result)
            document.getElementById('result').innerText = `=${e.data.result}`
          }
        })

      })
    }
  }

}



function onCalculate() {

  /*
    Esta se encarga de los eventos cuando 
    se presiona o se mantene presionado el 
    boton igual (=)
  */

  const button = document.getElementById("btn-item-opacity-equals");
  let mousedownTime;
  
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
        operation:'eval',
        mode:'deg'
      },(e) => {
        if(e.data.result.status == undefined) {
          document.getElementById('operation').innerText = e.data.result
          document.getElementById('result').innerText = 'Borra'
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





onCalculate()
onClickButton()






