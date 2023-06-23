const express = require('express')
const uuid = require("uuid")
const port = 3000

const app = express()
app.use(express.json())


const orders = []

const checkOrderId = (request, response, next) =>{
    const {id} = request.params
    const index = orders.findIndex(order => order.id === id)

    if(index < 0 ){
    return response.status(404).json({message:"User not found"})
}

    request.userIndex = index
    request.userId = id
   next()
}

const logRequest = (request, response, next) => {
    console.log(`Método: ${request.method}`)
    console.log(`URL: ${request.url}`)
    next()
  }

  app.use(logRequest)



function adicionarALista(order){
orders.push(order)
}



app.get('/orders', (request, response) =>{
    
    return response.status(200).json(orders)
   })


app.post('/orders', (request, response) =>{
 
 const {orders, clientName, price} = request.body
 const newOrder = {id:uuid.v4(), orders, clientName, price, status:'Em Preparação'}

adicionarALista(newOrder) 

 return response.status(201).json(newOrder)
})

app.put('/orders/:id', checkOrderId,(request, response) =>{

   
    const newOrder = request.body
    const id = request.userId

    const upDateOrders = {id, newOrder}
    const index = request.userIndex
    
    
    orders[index] = upDateOrders
          
    return response.json(upDateOrders)
}) 

app.delete('/orders/:id', checkOrderId, (request, response) =>{
    const index = request.userIndex
   

    orders.splice(index, 1)

    return response.status(204).json()

})


 app.get('/orders/:id', checkOrderId, (request, response) =>{
   const index = request.userIndex
   

    return response.json(orders[index])
 })

app.patch('/orders/:id',checkOrderId, (request, response) =>{
    const {orders, clientName, price} = request.body
    const newOrder = {id:uuid.v4(), orders, clientName, price, status:'Pronto'}

adicionarALista(newOrder) 

 return response.status(201).json(newOrder)
    

   
 })





 

  
  

  






app.listen(port, () => {
  console.log(`Server Started on port ${port}`)
})
