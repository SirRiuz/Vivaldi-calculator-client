


function grath(func) {
  functionPlot({
    target:'#modal-graph',
    width:window.innerWidth,
    height:510,
    yAxis: { domain: [-6,6] },
    grid: false,
    data:[
      {
        fn:func,
        derivative:{
          fn:"x",
          updateOnMouseMove:false
        }
      }
    ]
  })
}



// functionPlot({
//   target:'#modal-graph',
//   width:window.innerWidth,
//   height:510,
//   yAxis: { domain: [-4, 4] },
//   grid: false,
//   data:[
//       {
//         fn: "y=sin(4x)",
//         derivative:{
//             fn: "2 * x",
//             updateOnMouseMove: true
//         }
//       }
//   ]
// })



