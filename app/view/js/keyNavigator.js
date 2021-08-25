


function onClickButton() {

  const btnsItemsList = document.getElementsByClassName('btn-item')
  const basicOperationsList = document.getElementsByClassName('btn-item-opacity')

  for(var x=0;x<=btnsItemsList.length;x++){
    if(btnsItemsList[x] != undefined){
      btnsItemsList[x].addEventListener('click',(e) => {
        if(e.target.attributes.rendervalue){
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.attributes.rendervalue.value
          console.log(document.getElementById('operation').textContent)
        } else {
          document.getElementById('operation').innerText = document.getElementById('operation').value + e.target.textContent
          console.log(document.getElementById('operation').textContent)
        }
      })
    }
  }

  for(var x=0;x<=basicOperationsList.length;x++){
    if(basicOperationsList[x] != undefined){
      basicOperationsList[x].addEventListener('click',(e) => {
        if(e.target.attributes.rendervalue){
          onRenderOperator(e.target.attributes.rendervalue.value)
        } else {
          onRenderOperator(e.target.textContent)
        }
      })
    }
  }

}




function onCalculate() {

  const button = document.getElementById("btn-item-opacity-equals");
  let mousedownTime;
  
  button.addEventListener('mousedown', () => {
    mousedownTime = new Date().getTime();
  });
  
  button.addEventListener('mouseup', function () {
    const mouseupTime = new Date().getTime(),
      timeDifference = mouseupTime - mousedownTime;

    if(timeDifference >= 400) {
      openModal(document.getElementById('modal-container'))
    } else {
      alert('Click')
    }
  });
}





onCalculate()
onClickButton()






