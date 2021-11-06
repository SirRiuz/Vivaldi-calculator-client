






function onCloceDialog() {
  document.getElementById('icon-container').addEventListener('click',(e) => {
    document.getElementById('modal-step').style.display = 'none'
  })
}



function onShow() {
  document.getElementById('show').addEventListener('click',(e) => {
    //alert(e.target.attributes.mode.value)
    document.getElementById('modal-step').style.display = 'block'
    printData(e.target.attributes.mode.value)
  })
}



function printData(mode) {

  const el = document.getElementById('step-body')
  el.innerHTML = '<div id="load">Cargando ...</div>'

  onGetSteps({
    latex:document.getElementById('operation').value,
    mode:mode
  },(data) => {
    el.innerHTML = ''


    if(data.steps.length > 0) {
      data.steps.map((i,x) => {
      
        var titleResult = ''
  
        i.title.map((i,x) => {
          if (x >= 1){
            titleResult += `<math-field id="title-sec">${i}</math-field>`
          } else {
            titleResult += `<math-field id="title">${i}</math-field>`
          }
        })
  
        // console.log(titleResult)
        // console.log('\n\n')
        
        el.innerHTML += `<div class="step-item">
        <div id="rule-container">
          ${titleResult}
        </div>
        <math-field id="latex-result">= ${i.result}</math-field>
        <div class="separator"></div>
      </div>`
      })
    } else {
      el.innerHTML = `<div id="error-messege"> <h1>:(</h1> No se pudo obtener el procedimiento de esta operacion </div>`
    }
  })
}




onCloceDialog()
onShow()
//onShowModal()




