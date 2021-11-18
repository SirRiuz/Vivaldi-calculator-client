


function onCloceDialog() {
  document.getElementById('icon-container').addEventListener('click',(e) => {
    document.getElementById('modal-step').style.display = 'none'
  })
}



function onShow() {
  document.getElementById('show').addEventListener('click',(e) => {
    //alert(e.target.attributes.mode.value)

    var mode = undefined
    if (e.target.attributes.mode.value == 'dif'){ mode = 'dif' }
    
    document.getElementById('step-body').innerHTML = 'Load'

    onGetSteps({
      mode:mode,
      latex:document.getElementById('operation').value
    },(e) => {
      document.getElementById('step-body').innerHTML = ''
      if(e.status == 'ok'){
        console.dir(JSON.stringify(e, null, "    "))

        var titleHtml = katex.renderToString(e.title, { throwOnError: false });
        document.getElementById('step-body').innerHTML += `<h1>${titleHtml}</h1><hr>`

        for(var x = 0;x<e.data.length;x++){
          document.getElementById('step-body').innerHTML += `
            <div id="item-${x}" class="item-container"></div>`
          if(e.data[x].title != null){
            var html = katex.renderToString(e.data[x].title, { throwOnError: false });
            document.getElementById(`item-${x}`).innerHTML += `<div id="title">${html}</div>`
          }

          for(var y=0; y < e.data[x].steps.length;y++){
            var html = katex.renderToString(e.data[x].steps[y], { throwOnError: false });
            document.getElementById(`item-${x}`).innerHTML += `<div>${html}</div>`
          }
        }


      } else {
        console.log(e)
        document.getElementById('step-body').innerHTML = 'Error<br/>'
        document.getElementById('step-body').innerHTML += e['type-error']
      }
    })
    document.getElementById('modal-step').style.display = 'block'
  })
}


onCloceDialog()
onShow()




