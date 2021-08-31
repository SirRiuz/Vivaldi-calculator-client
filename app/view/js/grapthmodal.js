



function closeModal() {
  document.getElementById('screen').addEventListener('click',(e) => {
    document.getElementById('grapth-canvas-modal').style.display = 'none'
  })
}


function openGraphModal() {
  document.getElementById('result').innerText = ''  

  document.getElementById('operation').innerText = document.getElementById('operation').value
  onParseLatex(document.getElementById('operation').textContent,(latex) => {
    document.getElementById('grapth-canvas-modal').style.display = 'block'
    console.log(latex)
    grath(latex.parse)
  })  
}



closeModal()



