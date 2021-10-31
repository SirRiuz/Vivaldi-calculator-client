

function getOperation() {

  const el = document.getElementById('operation')
  var operation = 'eval'
  console.log(el.value)
  
  if(el.value.match('lim') == 'lim') {
    operation = 'limit'
  }

  if(el.value.match('int') == 'int') {
    operation = 'integrate'
  }

  if(el.value.match('y = ') == 'y = ') {
    operation = 'derivate'
  }

  if(el.value.match('prod') == 'prod') {
    operation = 'sum'
  }

  if(el.value.match('sum') == 'sum') {
    operation = 'sum'
  }

  if(el.value.match('y=') == 'y=') {
    operation = 'derivate'
  }

  return operation
}



window.addEventListener('keypress',(e) => {
  getOperation()
})


