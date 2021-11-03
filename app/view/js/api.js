


const BASEURL = 'https://vivaldi-api-client.herokuapp.com/'



function onGetSteps(data,callback){

  //var url = `${BASEURL}api/v1/steps/?latex=${data.latex.replace('+','%2B')}&mode=${data.mode}`
  var url = `${BASEURL}api/v1/steps/`
  var params = new FormData()

  console.log(data)
  params.append('mode',data.mode)
  params.append('latex',data.latex)

  fetch(url,{
    method:'POST',
    body:params
  })
    .then(res => res.json())
    .then(res => {
      console.log(res)
      callback(res)
    })

    .catch(err => {
      console.log(err)
    })
    .catch(err => {
      console.log(err)
    })
  
}



function onGrapth3d(data,callback) {

  const url = `${BASEURL}api/v1/grapth/`
  var params = new FormData()

  params.append('latex',data.latex)
  params.append('mode',data.mode)

  console.log(data)
  console.log(data.latex)


  fetch(url,{
    method:'POST',
    body:params,
  })

    .then(res => res.json())
    .then(res => {
      callback(res)
    })

    .catch(err => { })
    .catch(err => { })
}



function onRequest(data,callback) {

  /*
    Esta funcion se encarga de realizar
    las llamadas a la api para obtener
    el resultado de la operacion
  */
  
  const url = `${BASEURL}api/v1/calculate/`
  var params = new FormData()

  params.append('latex',data.latex)
  params.append('operation',data.operation)

  fetch(url,{
    method:'POST',
    body:params
  })
    .then(res => res.json())
    .then(res => {
      callback(res)
    })

    .catch(err => {

    })
    .catch(err => {
    })
}




function onParseLatex(latexEpresion,callback) {

  const url = `${BASEURL}api/v1/latex-parser/`
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


