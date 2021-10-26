





function onCloceDialog() {
  document.getElementById('icon-container').addEventListener('click',(e) => {
    document.getElementById('modal-step').style.display = 'none'
  })
} 


function onShowModal() {
  printData()
}




function printData() {

  const el = document.getElementById('step-body')
  el.innerHTML = '<div id="load">Cargando ...</div>'

  onGetSteps({
    latex:'\\frac{3x^2}{x-1}',
    mode:'dif'
  },(data) => {
    el.innerHTML = ''
    data.steps.map((i,x) => {
      
      var titleResult = ''
      
      i.title.map((i,x) => {
        if (x >= 1){
          titleResult += `<math-field id="title-sec">${i}</math-field>`
        } else {
          titleResult += `<math-field id="title">${i}</math-field>`
        }
        
      })


      console.log(titleResult)
      console.log('\n\n')
      
      el.innerHTML += `<div class="step-item">
      <div id="rule-container">
        ${titleResult}
      </div>
      <math-field id="latex-result">= ${i.result}</math-field>
      <div class="separator"></div>
    </div>`
    })
  })
}




onCloceDialog()
onShowModal()




