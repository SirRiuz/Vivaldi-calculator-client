


function onRequest(data,callback) {

  /*
    Esta funcion se encarga de realizar
    las llamadas a la api para obtener
    el resultado de la operacion
  */
  
  const url = 'http://localhost:8000/api/v1/calculate/'
  var params = new FormData()

  params.append('latex',data.latex)

  fetch(url,{
    method:'POST',
    body:params
  })
    .then(res => res.json())
    .then(res => {
      callback(res)
    })

    .catch(err => {
      console.log('API ERROR')
    })
    .catch(err => {
      console.Console('Server error')
    })
}




function onParseLatex(latexEpresion,callback) {

  const url = 'http://127.0.0.1:8000/api/v1/latex-parser/'
  var params = new FormData()
  
  params.append('latex',latexEpresion)

  fetch(url,{
    method:'POST',
    body:params
  })
    .then(res => res.json())
    .then(res => {
      callback(res)
    })

    .catch(err => {
      console.log('API ERROR')
      console.log(err)
    })

    .catch(err => {
      console.Console('Server error')
    })
}


