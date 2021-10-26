

function getOperation() {

  const el = document.getElementById('operation')
  var operation = 'eval'
  
  if(el.value.match('lim') == 'lim') {
    operation = 'limit'
  }

  if(el.value.match('int') == 'int') {
    operation = 'integrate'
  }

  if(el.value.match('y = ') == 'y = ') {
    operation = 'derivate'
  }

  if(el.value.match('y=') == 'y=') {
    operation = 'derivate'
  }

  return operation
}



window.addEventListener('keypress',(e) => {
  getOperation()
})


