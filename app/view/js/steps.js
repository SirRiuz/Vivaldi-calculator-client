


function onCloceDialog() {
  document.getElementById('icon-container').addEventListener('click',(e) => {
    document.getElementById('modal-step').style.display = 'none'
  })
}



function onShow() {
  
  document.getElementById('show').addEventListener('click',(e) => {
    document.getElementById('step-body').innerHTML = '<div id="load-picker"><div class="loading-spinner"></div></div>'
    document.getElementById('modal-step').style.display = 'block'
    onGetDataSteps()
  })
}


function onGetDataSteps(count=0){

  var mode = ''

  if(document.getElementById('show-icon').attributes.mode.value == 'dif'){ mode = 'dif'}

  if(count == 2){ return null }

  console.log(document.getElementById('show-icon').attributes.mode.value)
  console.log(document.getElementById('operation').value)

  onGetSteps({
    mode:mode,
    latex:document.getElementById('operation').value
  },(e) => {

    if(e.status == 'ok'){
      document.getElementById('step-body').innerHTML = ''
      document.getElementById('step-body').innerHTML += `<h1>${
        katex.renderToString(e.title, { throwOnError: false })
      }</h1> <hr>`


      for(var x = 0;x<e.data.length;x++){
        document.getElementById('step-body').innerHTML += `
          <div id="item-${x}" class="item-container"></div>`
        if(e.data[x].title != null){
          document.getElementById(`item-${x}`).innerHTML += `<div id="title">${
            katex.renderToString(e.data[x].title, { throwOnError: false })
          }</div>`
        }

        for(var y=0; y < e.data[x].steps.length;y++){
          document.getElementById(`item-${x}`).innerHTML += `<div id="item">${
            katex.renderToString(e.data[x].steps[y], { throwOnError: false })
          }</div>`
        }
      }
    }

    if(e.status == 'error' && e['type-error'] == 'token-error') { onGetDataSteps(count + 1) }

    if(e.status == 'error' && e['type-error'] == 'sintax-error') {
      document.getElementById('step-body').innerHTML = ''
      document.getElementById('step-body').innerHTML = '<div id="messege-container"><span>No pudimos obtener el procedimiento de esta operacion</span></div>'
    }

  })
}





onCloceDialog()
onShow()




