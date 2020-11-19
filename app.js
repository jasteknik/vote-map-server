//Mandatatory server things
const express = require('express')
const app = express()
const port = process.env.PORT || 4000
const cors = require('cors')

//My own
let maps = []

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
app.use(cors())
app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api', (req, res) => {
  const data = req.body
  let found
  console.log("I got vote for: " + data.name)
  console.log("DATA: " + data)
  
  
  
  //Find index of map if already added
  
  if (maps.length > 0) {
    found = maps.findIndex(x => x.name === data.name);
    if(found > -1) {
      maps[found].count += 1 
    }
    else {
      maps.push(data)
    }
  }
  else {
    maps.push(data)
  }
  
  console.log(maps)
  


  res.end()

})

app.post('/clearmaps', (req, res) => {
  maps = []

  res.end()
})

app.post('/getmaps', (req, res) => {
  const data = req.body
  console.log("maps updated")
  //res.end()
  res.json(maps)
})