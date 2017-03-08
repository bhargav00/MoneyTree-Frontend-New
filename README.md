# Money-Tree
Survival Skills GMI Project

Client Project by Sapient GMI Team

[![Stories in Ready](https://badge.waffle.io/bhargav00/Money-Tree-GMI.svg?label=ready&title=Ready)](http://waffle.io/bhargav00/Money-Tree-GMI)


use case doc: https://docs.google.com/document/d/1ObBN0MdIiR9NXOBOEGLIa7YVnD8afFzTE_GzAHow-bY/edit?usp=sharing


##API References:

###Login API:  :+1:
**method** : POST  
**url**: 10.203.60.100:3000/login  
**Parameters** : username & password & type(values should be 'pm' or 'et')  
**returns** : status:(successful & access type(wil be pm or et only),  
                 incomplete(if any field is empty) or   
                 failure(wrong credentials))
                 
                 
###Create Order API:  :+1:
**metod** : POST  
**url**: 10.203.60.100:3000/create_order  
**Parameters** : side, symbol , quantity,et_id ,current_price(must)
             limit_price,stop_price,(optional)  
**returns** : status(successfull: updated in database),  
                    incomplete(if any field is empty) or   
                    failure(wrong input))
                    login failure(if PM is not logged in)
                 

###stock_search API:  :+1:
**method**: GET   
**url**: 10.203.60.100:3000/search/:string [**string will be any character which have to searched**]  
**returns**: JSON Array of [(**stock_name** and **price**)] for each matched stocks  
**return format sample json**:{
  "stock": [
    {
      "stock_name": "tcs",
      "price": 500
    },
    {
      "stock_name": "tata",
      "price": 700
    }
  ]
}

###get_et API:  :+1:
**method**: GET     
**url**: 10.203.60.100:3000/get_et     

**returns**: all the equity_trader related to the particular portfolio manager

**return format sample json**: [
  {
    "id": 1,
    "name": "test"
  },
  {
    "id": 2,
    "name": "kasab"
  },
  {
    "id": 3,
    "name": "osmana"
  }
]
###order_history api: :+1:  
**method**:GET  
**url**:10.203.60.100:300/history  

**returns**:order history table for the pm/et who is currently logged in  

**return format sample json**:{
  "table": [
    {
      "order_id": 1,
      "stock_name": "tcs",
      "name": "test",
      "side": "undefined ",
      "symbol": " undefined",
      "total_qty": 100,
      "limit_price": 0,
      "stop_price": 0,
      "date": null,
      "time": "00:00:00.000000"
    }
  ]
}
               
##Moneytree Logo path :
image/moneytree.png  (when code is in app folder)  
                      or  ../image/moneytree.png  (code in different folder)  
