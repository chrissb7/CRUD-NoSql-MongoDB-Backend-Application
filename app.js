//BACK-END
//Run in console only
//Data has been inserted into collection in advance of running below queries
//Data has beenhardcoded below where specified in order to show functionality


//Each section for CRUD activities has been commented out for testing purposes.
//Lines specified for each activity to uncomment are mentioned below

//Node modules required
const express = require('express');   //Express imported              
const MongoClient = require("mongodb").MongoClient; //Mongo package installed
var { ObjectID, ObjectID } = require('bson'); //Object ID packagae from Mongo to create unique ID's


const url = "mongodb+srv://chris123:chris123@cluster0.d22ab.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

//Connection string for Atlas, password and user hard coded in.

const app = express();
//Express app module saved into const


app.listen(3000);
//Open port

process.on("SIGINT", function () {
    console.log("\nDatabase: Disconnected!\n");
    process.exit();
    });//Upon closing connection display the message above



//Global variables that are obtained from the randomCustomer function, executed in 1st promise
//Function is below promise chain, more detail there.
var randCustomerID="";
var customerFirstName="";
var customerSurname="";


//The following nested promise chain to ensure the sequence of CRUD is executed in order



MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
    .then((client) => { //Promises to execute asynchrously and functions execute sequentially
                        //Each promise executes each part of the CRUD functionality
                        //1st promise to execute Create activity of CRUD for all 3 tables

    console.log("USERS database connected! on port 3000 " + "\n"); //Log message to show MongoDB database connected
    console.log("----------------------------------------" + "\n");
    
    
        randomCustomer(client); //Executed before CRUD functionality to ensure insertion on insertOrder/findOrder methods can-
                                //have a customer ID parameter not empty.     

        if(!randCustomerID){ //When the async function has returned a value and stored it in the global variable the CRUD sequence begins

        //Nested promises within the if statement(in the first promise) execute CRUD functionality
        
        MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
        .then((client) => { 
                                                 //Varaibles to convert object ID from Mongo to strings to be used in data entries
        var customerID= String(new ObjectID()); //Create a new unique ID for CustomerID for Customer Information Table and For Orders CustomerID field
        var orderId = String(new ObjectID()); //Create a new unique ID for orderID for Orders
        
        //UNCOMMENT BELOW LINE 71-115 IN ORDER TO USE CREATE FUNCTIONALITY  

        // insertCustomer(client, //Function to insert data into Customer Information database
        //     {   
        //         //Below, data fields and structure, to be inserted into Customer information table
        //         //Please be aware 8 documents were created/inserted in collection for demo to see 
        //         CustomerID: customerID, //Random unique ID generated for customerID everytime executed
        //         Title: "Mr.",
        //         FirstName: "John",
        //         Surname: "Bland",
        //         Mobile: "0861649031",
        //         EmailAddress: "boringman@gmail.com",
                
        //         homeAddress: {
        //             AddressLine1: "10",
        //             AddressLine2: "Cardboard st.",
        //             CountyCity: "Carlow",
        //             EIRCODE: "TU99"
        //         },

        //         shippingAddress: {
        //             AddressLine1: "10",
        //             AddressLine2: "Cardboard st.",
        //             CountyCity: "Carlow",
        //             EIRCODE: "TU99"
        //         }
        //     }
        // );
        
        // // Below, function to insert data into Item Details database
        // // Below, data fields and structure, to be inserted into Item Details table (Items sold by store requirement)
        // // Please be aware 8 documents were created/inserted in collection for demo to see, data hardcoded to be used in testing.
       
       
        // insertItem(client,{Manufacturer:"MOTOROLA", Model:"Moto",Price:"€119.99"});
        // insertItem(client, {Manufacturer: "SONY" , Model: "Xperia 4",Price:"€199.99"});
           
        //   //Below, function to insert data into Orders database
        //  //Below, data fields and structure, to be inserted into Orders table (Customer Orders requirement)
        // //Please be aware 8 documents were created/inserted in collection for demo to see/work with
        
        // insertOrder(client, randCustomerID, orderId,
        //       [
        //         {"Manufacturer": "Huwaei" , "Model": "P30 Lite"},
        //         {"Manufacturer": "SONY" , "Model": "Xperia 5"}
        //       ]
        //     );

    }).then(()=>{ //2nd promise to execute Create activity of CRUD for all 3 tables
        MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
        .then((client)=>{
        
        // UNCOMMENT BELOW LINE 122-130 IN ORDER TO USE RETRIEVE FUNCTIONALITY    

        //Find one random customer and return information to console
        findCustomer(client, 1); 
        
        // Find all orders for one customer and return information to console
        findOrder(client, customerFirstName, customerSurname, randCustomerID);
        
        //Find all items for one customer and return information to console
        findItem(client,1);
        
    })}).then(()=>{ //3rd promise to execute Create activity of CRUD for all 3 tables
        MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
        .then((client)=>{
        
        //UNCOMMENT BELOW LINE 136-148 IN ORDER TO USE UPDATE FUNCTIONALITY       

        // //Update one random customer function, information to update with in function below 
        // //Updates email, phone, title fields of one random user   
        // updateCustomer(client);
        
        // // //Update Order function, information of parameters to update in function below (hard coded)
        // // //Updates order ID of one random Order with new order ID
        // updateOrder(client);
        
        // // //Update Item function, information of parameters to update in function below (hard coded)
        // // //Updates Item Manufacturer, Model and Price on random phone
        // updateItem(client);
        
        
    })}).then(()=>{ //2nd promise to show CRUD functions on Orders table
        MongoClient.connect(url, { useNewUrlParser:true, useUnifiedTopology: true })
        .then((client)=>{
            
        //UNCOMMENT BELOW TO LINE 155-164 IN ORDER TO USE DELETE FUNCTIONALITY    


        // //deleteCustomer Function Deletes the customer with the specified parameters below in the Customer Information table
        // deleteCustomer(client,{ email:"brexit@gmail.com",mobile:"0863890522",FirstName:"Barry" ,lastName:"Britain"} )  
        // //deleteItem Function Deletes the item with the specified parameters (model of item/mobile)in Item details table
        // deleteItem(client, "3330");
        // //deleteOrder Function Deletes the order with the specified order no. below in Orders table
        // deleteOrder(client, "6088590c5d33822cc82e6820");
        // deleteOrder(client, "6088594fa34a8a2cd1dcceca");    
   
    })})}}) .catch(error => { console.log("There has been an error with connecting to the Database") });
    
    


//Below function is to get the random document from customer information.
//As Normalised structure used for database orders are created from an existing customer
//This function gets the customer ID from customer information collection
//The results (see global variables above promises) are then used in findOrder, insertOrder
//Function gets a random customer and the ID, therefore creating random orders for 1 randomly selected customer
//Helps fulfil the retrieve random requirements
async function randomCustomer(client) {
    const random = await client.db("firstDatabase").collection("Customer Information").aggregate(
        [{ $sample: { size: 1 } }]);  
         
    random.forEach(result => {    
    randCustomerID = (`${result.CustomerID}`);
    customerFirstName = (`${result.FirstName}`);
    customerSurname = (`${result.Surname}`);    
    });      
 }




 ////////////////////////////////////////Create functionality/////////////////////////////////////////
 /////////////////////////////////////////////////////////////////////////////////////////////////////


 ////CREATE CUSTOMER FUNCTIONALITY

//Insert Customer function allows for one parameter, as above for example, the details are inserted with the insertOne query
async function insertCustomer(client, details) {
    const result = await client.db("firstDatabase").collection("Customer Information").insertOne(details);

    console.log("============================================================================");  
    console.log("The user was successfully added" + "\n" + (JSON.stringify(result.ops[0], null, 3)));
    console.log("============================================================================");
    console.log("\n");  

    
}

////CREATE ORDER FUNCTIONALITY

//insertOrder function inserts an order into the Orders table
//Takes two parameters after client, the unique generated orderID and the items of the order, as above example shows
async function insertOrder(client, customerID, orderID, itemsArray) {
    var itemModel=[]; //Scoped variable for access throughout function
    
    //For loop goes through the parameters itemsArray and takes each indexes Model and searches the Item Details collection
    for(var i=0; i<itemsArray.length; i++)
    {
    //Iteration through itemsArray parameter, .Model string is saved 
    var model = itemsArray[i].Model;   
    //.Model string is saved into query    
    var query = ({Model: model});
    //Upon finding an item that matches it grabs the details of the Item by searching with the query (Model of phone to find)
    const validItem= await client.db("firstDatabase").collection("Item Details").find(query);
    //The details found of the searched item are put into a new object which is saved into the itemModel array with .push    
        await validItem.forEach(result => {    
        itemModel.push({"Manufacturer":(`${result.Manufacturer}`), "Model": (`${result.Model}`), 
        "Price":(`${result.Price}`) });
            });
    }//End of for loop
            
    // Insertion of data into Orders collection. Structured in the orderDetails object as below.
    // Random CustomerID stored in customer variable is added below
    // itemModel array with phones for orders inserted
    var orderDetails =
            {   
                CustomerID: customerID,
                OrderID: orderID,
                ItemsPurchased: itemModel
                
            }

    insertedOrder(client,orderDetails);  
    
    // Query to insert orderDetails in to the Orders collection, executed above.
    async function insertedOrder(client, orderDetails) {
        const result = await client.db("firstDatabase").collection("Orders").insertOne(orderDetails);
        
        console.log("Order was successfully added: ");
        console.log("============================================================================");
        console.log("\n" + (JSON.stringify(result.ops[0], null, 3)));
        console.log("============================================================================");   
        }
} //END OF CREATE ORDER FUNCTIONALITY  



////CREATE ITEM FUNCTIONALITY

//Function to add item to the Item Details collection
    async function insertItem(client, itemDetails) {
        const result = await client.db("firstDatabase").collection("Item Details").insertOne(itemDetails);

        console.log("Item was successfully added" + "\n" + (JSON.stringify(result.ops[0], null, 3)));
        console.log("============================================================================");
        console.log("\n" + "\n");
    
        }//END OF CREATE ITEM FUNCTIONALITY  


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////Find functionality///////////////////////////////////////////////////////

//Reference for guidance on below function: https://www.mongodb.com/blog/post/quick-start-nodejs--mongodb--how-to-analyze-data-using-the-aggregation-framework

////RETRIEVE CUSTOMER FUNCTIONALITY

//Function to find one random Customer
async function findCustomer(client, n) {
    const random = await client.db("firstDatabase").collection("Customer Information").aggregate(
        [{ $sample: { size: n } }]);

        //Any result returned will be console logged as so with array method that works with aggregate query
        await random.forEach(result => {
        console.log("\n");
        console.log("\n");
        console.log("=====================================");
        console.log((`${result.FirstName}`)+ " " +(`${result.Surname}` + " Details(retrieved from database)"));
        console.log("=====================================");
        console.log(
        "\n" + ("Title: " + `${result.Title}`) + 
        "\n" + ("Mobile Phone no: " + `${result.Mobile}`)+ 
        "\n" + ("HOME ADDRESS:") + 
        "\n" + ("------------------------------------") +   
        "\n" + ("Address Line1: " + `${result.homeAddress.AddressLine1}`) + 
        "\n" + ("Address Line2: " + `${result.homeAddress.AddressLine2}`)+ 
        "\n" + ("County/city: " + `${result.homeAddress.CountyCity}`)+ 
        "\n" + ("Eircode: " + `${result.homeAddress.Eircocde}`) +
        "\n" + ("SHIPPING ADDRESS:") + 
        "\n" + ("------------------------------------") +  
        "\n" + ("Address Line1: " + `${result.shippingAddress.AddressLine1}`)+ 
        "\n" + ("Address Line2: " +`${result.shippingAddress.AddressLine2}`)+ 
        "\n" + ("County/city: " + `${result.shippingAddress.CountyCity}`)+ 
        "\n" + ("Eircode: " + `${result.shippingAddress.Eircocde}`) );
        console.log("============================================================================");    

    }); 
}//END OF RETRIEVE CUSTOMER FUNCTIONALITY


////RETRIEVE ORDER FUNCTIONALITY

//reference for below MongoDB query: https://stackoverflow.com/questions/23974140/node-js-and-mongo-db-how-to-console-log-data

//findOrder function takes in randCustomerID global variable for customerID variable (see top of code) 
//-and uses this parameter to find orders
async function findOrder(client, firstname, surname, customerID){
  await client.db("firstDatabase").collection("Orders").find({CustomerID: customerID}).toArray(function(err, docs)
{  //Results are put to an array and then the following console log is executed to display the orders
    if (err){
        console.log("No order could be found matching the criteria")
    }
    else{ 
    console.log("\n");    
    console.log("\n");
    console.log("================================");
    console.log(firstname + " " + surname + " Orders on database"); 
    console.log ("********************************");  
    for(var i=0; i<=docs.length; i++){ //Loops over every order for a customer and prints to the console
    var findRandomOrder="";    
    findRandomOrder =(JSON.stringify(docs, null, 3)); //Order information returned as JSON string.
    console.log( "Order no: " + [i] );
    console.log("============================================================================");
    console.log(findRandomOrder);
    console.log("============================================================================");
        }
    }
 });
 }//END OF RETRIEVE ORDER FUNCTIONALITY



////RETRIEVE ITEM FUNCTIONALITY

//findItem returns one random item from Item Details collection
async function findItem(client, n) {
    const randomItem = await client.db("firstDatabase").collection("Item Details").aggregate(
        [{ $sample: { size: n } }]);
    
   //Iterate through results and print to console.      
    await randomItem.forEach(result => {
        console.log("\n");  
        console.log("\n"); 
        console.log("===================");
        console.log("Phone Details Found:"); 
        console.log("===================");    
        console.log("Manufacturer: " + `${result.Manufacturer}`);
        console.log("Model: " + `${result.Model}`);
        console.log("\n");
    console.log("============================================================================");
    console.log("\n");
    }); 
    
}//END OF RETRIEVE ITEM FUNCTIONALITY




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////Update functionality////////////////////////////////////////////////////


////UPDATE CUSTOMERS FUNCTIONALITY

//Update one random customer
async function updateCustomer(client, details){
    //Query random user from database and use in updater function below
    var updateName="";
    const random2 = await client.db("firstDatabase").collection("Customer Information").aggregate(
        [{ $sample: { size: 1 } }]);   
        
        await random2.forEach(result => {
            updateName=(`${result.FirstName}`); 
        }); 

        //Fields hardcoded in for updating
        updaterCustomers(client, updateName, {EmailAddress:"chrisb100@gmail.com", Mobile: "087268888"});

}

//function below does the updating for update customer(function nested and executed in above function)
async function updaterCustomers (client, name, updateEmailPhone){
    //Query that carries out the update for random customer
    const update= await client.db("firstDatabase").collection("Customer Information").updateOne(
        {FirstName: name},
        {$set: updateEmailPhone}
    );
    
    console.log("\n");
    console.log("===============================================================");    
    console.log(name +" has been updated in Customers Information collection")
    console.log(`${update.matchedCount}`);
    console.log(`${update.modifiedCount}`);
    console.log("===============================================================");    
    console.log("\n");
}
//END OF UPDATE CUSTOMERS FUNCTIONALITY




////UPDATE ORDERS FUNCTIONALITY

//updateOrder function updates all orders with CustomerID obtained from a random order in Orders collection
async function updateOrder(client){
    //Query random user from Orders and use in update function
    var updateOrder="";
    const random2 = await client.db("firstDatabase").collection("Orders").aggregate(
        [{ $sample: { size: 1 } }]);   
        
        await random2.forEach(result => {
            updateOrder=(`${result.CustomerID}`);
        }); 

        //Order number is updated with new randomly generated order no.     
        var updateOrderID = String(new ObjectID());

        updaterOrder(client, updateOrder, updateOrderID, {OrderID: updateOrderID})

}

async function updaterOrder (client, updateOrder, updateOrderID, newOrderId){
    //Query that carries out for the random order
    const updateOrderQuery= await client.db("firstDatabase").collection("Orders").updateMany(
        {OrderID: updateOrder},
        {$set: newOrderId }
    );
    
    console.log("\n");
    console.log("===============================================================");
    console.log("Order Id(" + updateOrder +") on orders updated to : " + updateOrderID)
    console.log(`${updateOrderQuery.matchedCount}`);
    console.log(`${updateOrderQuery.modifiedCount}`);
    console.log("===============================================================");
    console.log("\n");
}//END OF UPDATE ORDERS FUNCTIONALITY



////UPDATE ITEMS FUNCTIONALITY

//updateItem function updates all orders with CustomerID obtained from a random Item, obtained from below query in function
//updateItem includes a nested function that inserts the random query for an item, specificallt the Items (mobile phone) Model
async function updateItem(client){
    //Query random user from database and use in update
    var updateItem="";
    const random2 = await client.db("firstDatabase").collection("Item Details").aggregate(
        [{ $sample: { size: 1 } }]);   
        
        await random2.forEach(result => {
            updateItem=(`${result.Model}`);
        }); 


        //Item is updated where specified for the CustomerID
        updaterItem(client, updateItem, {Manufacturer: "Galaxy", Model: "S21", Price: "€800"});

}

async function updaterItem (client, PhoneToUpdate, Phone){
//Query updates phone model & manufacturer & price fields to the above hardcoded (see updaterItem function above line 460)
    const update= await client.db("firstDatabase").collection("Item Details").updateMany(
        {Model: PhoneToUpdate },
        {$set: Phone }
    );
 
//Query updates phone model & manufacturer & price fields to the above hardcoded (see updaterItem function above line 460)
//Query below updates phones in Orders collection to reflect item updated in the Item Details collection    
    const update2= await client.db("firstDatabase").collection("Orders").updateMany({"ItemsPurchased": {$elemMatch: {"Manufacturer": 
    {$ne: PhoneToUpdate }}}}, {$set: {"ItemsPurchased.$.Manufacturer": Phone.Manufacturer}, $set: {"ItemsPurchased.$.Model": Phone.Model}})
   
    console.log("\n")
    console.log("==================="); 
    console.log("Phone Item details for " + PhoneToUpdate + " have updated in Item Details collection to:" + Phone.model);
    console.log("==================="); 
    var totalItems=(`${update.matchedCount}`);
    console.log(totalItems)
    console.log(`${update.modifiedCount}`);
    console.log("\n")
    console.log("===================");     
    console.log("Phone Item details for " + PhoneToUpdate + " have updated in  Orders collection to:" + Phone.model);
    console.log("==================="); 
    var totalItems2=(`${update2.matchedCount}`);
    console.log("Matched Documents: "+ totalItems2)    
    console.log("Modified: " + (`${update2.modifiedCount}`));
    console.log("\n");   

}//UPDATE ITEMS FUNCTIONALITY




///////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////Delete functionality/////////////////////////////////////////////////


/////DELETE CUSTOMER FUNCTIONALITY

//Delete a customer, see function above in promise to see accepted parameters
async function deleteCustomer(client, details){
    console.log("\n");
    console.log("===================");
    console.log("Customers to Delete:"); 
    console.log("==================="); 
    //Deletes all instances where the email, mobile and names match
    await client.db("firstDatabase").collection("Customer Information").deleteMany({ EmailAddress:details.email,
    Mobile:details.mobile,FirstName:details.FirstName,Surname:details.lastName},function(err, status)
    
    {
        if (err){
            console.log("There are no Customers matching those details");
            console.log("============================================================================");
        }
        else{
            console.log(status.result.n + " Customers deleted from Item Details table");
            console.log("============================================================================");
        }

    });
}//END OF DELETE CUSTOMER FUNCTIONALITY



/////DELETE ITEMS FUNCTIONALITY

// Delete an item from Items Details collection
async function deleteItem(client, details){
    console.log("\n");
    console.log("===================");
    console.log("Item Details to Delete:"); 
    console.log("==================="); 
    
      await client.db("firstDatabase").collection("Item Details").deleteMany({Model:details}, function(err, status)
    
    {
        if (err){
            console.log("There are no documents matching those details");
            console.log("============================================================================");
        }
        else{
            console.log(status.result.n + " Phones deleted from Item Details table");
            console.log("============================================================================");
        }

    });
    
    console.log("\n");
    
    //In deleting data the Orders where there are instances of the phone are-
    //updated to be removed from any corresponding orders.
        await client.db("firstDatabase").collection("Orders").updateMany({}, 
        {$pull: {ItemsPurchased: {Model: details}}}, 
        {multi: true},  function(err, status)
    
        {
            if (err){
                console.log("\n");
                console.log("============================================================================");
                console.log("There are no documents to Pull from the Orders Table");
                console.log("============================================================================");
            }
            else{
                console.log("\n");
                console.log("============================================================================");
                console.log(status.result.n + " Phones pulled from orders in orders table");
                console.log("============================================================================");
            }
    
        });

        
}//END OF DELETE ITEMS FUNCTIONALITY



/////DELETE ORDERS FUNCTIONALITY

//Orders are deleted with specified OrderID number
async function deleteOrder(client, details){
    console.log("\n");
    console.log("===================");
    console.log("Orders to Delete:"); 
    console.log("==================="); 
    await client.db("firstDatabase").collection("Orders").deleteMany({OrderID:details},function(err, status)
    
    {
        if (err){
            console.log("\n");
            console.log("============================================================================");
            console.log("There are no documents matching those details");
            console.log("============================================================================");
        }
        else{
            console.log("\n");
            console.log("============================================================================");
            console.log(status.result.n + " Orders deleted from orders in orders table");
            console.log("============================================================================");
        }

    });


}//END OF DELETE ORDER FUNCTIONALITY



//Normalised database was chosen with Unique ids for customer information & orders id collections.
//Customer ID is a primary key in customers information collection and a foreign key in orders collection.
//Orders have a unique OrderID also.
//The choice was made so as to avoid redundant data.


//THE END! :)