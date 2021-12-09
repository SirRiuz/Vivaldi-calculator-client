



function onOpenDialog() {
  //var isShow = window.location.search.split('=')[1]
  var isOpen = localStorage.getItem('isOpen')
  console.log(isOpen)
  if(isOpen == null){
    document.getElementById('tutorial-modal-container').style.display = 'block'
    localStorage.setItem('isOpen',true)
  }
}


function onClose() {
  document.getElementById('tutorial-screen').addEventListener('click',(e) => {
    document.getElementById('tutorial-modal-container').style.display = 'none'
  })
}



onClose()
onOpenDialog()






