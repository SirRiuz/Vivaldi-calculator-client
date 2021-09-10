


const el = document.getElementById('modal-container')   // Contexto del modal



function getContext() {
  /*
    Obtiene el contexto del 
    modal
  */
  return el
}

function onCloseModal(ctx) {
  /*
    Esta funcion se encarga de cerrar
    el modal
  */
  ctx.style.display = 'none'
}


function onClickButonItem(ctx) {

  /*
    Esta funcion se encarga de gestionar
    los eventos cuando se hace click en 
    cualquier boton en el modal
  */

  var itemList = document.getElementsByClassName('item-operation-modal')
  
  for(var x=0;x<=itemList.length;x++) {
    if(itemList[x] != undefined) {
      itemList[x].addEventListener('click',(e) => {
        if(e.target.attributes.action) {
          onCloseModal(ctx)
          console.log(document.getElementById('operation').value)

          onRequest({
            latex:document.getElementById('operation').value,
            operation:e.target.attributes.action.value,
            mode:'deg'
          },(e) => {
            if(e.data.status == 'ok') {
              console.log(e)
              document.getElementById('result').innerText = e.data.result
            } else {
              console.error('Error de sintaxis ...')
            }
          })


          if(e.target.attributes.action.value == 'grapth'){
            openGraphModal()
          }
        }
      })
    }
  }

}


function onBackScreen(ctx) {

  /*
    Esta funcion se encarga de cerrar
    el modal al hacer click en el 
    screen (Fondo tracero)
  */

  const elScreen = document.getElementById('screen')

  elScreen.addEventListener('click',(e) => {
    ctx.style.display = 'none'
  })
}


function openModal(ctx) {

  /* Se encarga de abrir el modal */
  
  ctx.style.display = 'block'
}





onClickButonItem(el)
onBackScreen(el)
//openModal(el)


