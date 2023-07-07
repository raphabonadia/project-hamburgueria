 import express from "express"
 import { v4 as uuidv4 } from "uuid";
 import cors from "cors"

 const port = 3001;
 const app = express();
 app.use(express.json());
 app.use(cors());


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
 try{
 const {orders, clientName} = request.body
  if(orders < 1) throw new Error("Minimum order over 1")

  const newOrder = {id: uuidv4(), orders, clientName, status:'Em Preparação'};


adicionarALista(newOrder) 

 return response.status(201).json(newOrder)
  } catch(err){
 return response.status(400).json({error:err.message})
 } finally{
    console.log("Terminou tudo")
  }
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
    const {orders, clientName} = request.body
    const newOrder = {id: uuidv4(), orders, clientName, status: 'Pronto'};


 adicionarALista(newOrder) 

 return response.status(201).json(newOrder)
    

   
 })





 

  
  

  






 app.listen(port, () => {
 console.log(`Server Started on port ${port}`)
})










// import express from "express"
// import { v4 as uuidv4 } from "uuid";
// import cors from "cors"

// const port = 3001;
// const app = express();
// app.use(express.json());
// app.use(cors());

// const users = [];

// const checkPersonId = (request, response, next) => {
//   const { id } = request.params;
//   const index = users.findIndex(user => user.id === id);

//   if (index < 0) {
//     return response.status(404).json({ message: 'Person not found' });
//   }

//   request.userIndex = index;
//   request.userId = id;
//   next();
// };

// const logRequest = (request, response, next) => {
//   console.log(`Método: ${request.method}`);
//   console.log(`URL: ${request.url}`);
//   next();
// };

// app.use(logRequest);

// function addToList(person) {
//   users.push(person);
// }

// app.get('/users', (request, response) => {
//   return response.status(200).json(users);
// });

// app.post('/users', (request, response) => {
//   try {
//     const { name, age } = request.body;

//     if (age < 18) {
//       throw new Error('Age must be 18 or older');
//     }

//     const newUsers = { id: uuidv4(), name, age };



//     addToList(newUsers);

//     return response.status(201).json(newUsers);
//   } catch (err) {
//     return response.status(400).json({ error: err.message });
//   } finally {
//     console.log('Finished');
//   }
// });

// app.put('/users/:id', checkPersonId, (request, response) => {
//   const { name, age } = request.body;
//   const id = request.userId;
//   const index = request.userIndex;

//   const updatedUsers = { id, name, age };

//   users[index] = updatedUsers;

//   return response.json(updatedUsers);
// });

// app.delete('/users/:id', checkPersonId, (request, response) => {
//   const index = request.userIndex;

//   users.splice(index, 1);

//   return response.status(204).json();
// });

// app.get('/users/:id', checkPersonId, (request, response) => {
//   const index = request.userIndex;

//   return response.json(users[index]);
// });

// app.patch('/users/:id', checkPersonId, (request, response) => {
//   const { name, age } = request.body;
//   const newUsers = { id: uuidv4(), name, age };

//   addToList(newUsers);

//   return response.status(201).json(newUsers);
// });

// app.listen(port, () => {
//   console.log(`Server Started on port ${port}`);
// });
