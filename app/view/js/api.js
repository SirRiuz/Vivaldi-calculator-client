


const BASEURL = 'https://vivaldi-api-client.herokuapp.com/'




function onGetSteps(data,callback){

  //var url = `${BASEURL}api/v1/steps/?latex=${data.latex.replace('+','%2B')}&mode=${data.mode}`
  var url = `${BASEURL}api/v1/steps/`
  var params = new FormData()

  if(data.mode != undefined){
    params.append('mode',data.mode)    
  }
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

    .catch(err => { callback(null) })
    .catch(err => { callback(null) })
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
  params.append('modeMath',data.mode)

  fetch(url,{
    method:'POST',
    body:params
  })
    .then(res => res.json())
    .then(res => {
      callback(res)
    })

    .catch(err => {
      callback(null)
    })
    .catch(err => {
      callback(null)
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



function onStartServer(){

  /*
    Esta funcion envia una peticion inicial
    al servidor, esto con el fin de iniciarlo
    si esta apadado
  */

  fetch(`${BASEURL}?m=start`)
    .then(() => { console.info('Send request ...') })
    .catch(() => { console.error('Error to request') })
}


onStartServer()



