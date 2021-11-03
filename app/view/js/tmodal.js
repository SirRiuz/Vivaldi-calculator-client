



function onOpenDialog() {
  var isShow = window.location.search.split('=')[1]

  if(isShow != undefined && isShow == 'true'){
    document.getElementById('tutorial-modal-container').style.display = 'block'
  }
}


function onClose() {
  document.getElementById('tutorial-screen').addEventListener('click',(e) => {
    document.getElementById('tutorial-modal-container').style.display = 'none'
  })
}



onClose()
onOpenDialog()






