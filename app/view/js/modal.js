


const el = document.getElementById('modal-container')



function getContext() {
  return el
}

function onCloseModal(ctx) {
  ctx.style.display = 'none'
}


function onClickButonItem(ctx) {
  var itemList = document.getElementsByClassName('item-operation-modal')
  
  for(var x=0;x<=itemList.length;x++) {
    if(itemList[x] != undefined) {
      itemList[x].addEventListener('click',(e) => {
        if(e.target.attributes.action) {
          alert(e.target.attributes.action.value)
          onCloseModal(ctx)
        }
      })
    }
  }

}


function onBackScreen(ctx) {
  const elScreen = document.getElementById('screen')

  elScreen.addEventListener('click',(e) => {
    ctx.style.display = 'none'
  })
}


function openModal(ctx) {
  ctx.style.display = 'block'
}





onClickButonItem(el)
onBackScreen(el)
//openModal(el)


