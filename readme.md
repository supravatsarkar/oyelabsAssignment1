## Phone number Login and customer add API
- Default Admin mobileNo: 9851650495, password: 123456
### Endpoints
* POST   /login
content-type: application/json

{
    "mobileNo": "9851650495",
    "password": "123456"
} 


* POST   /addCustomer?userMobileNo=9851650495

content-type: application/json

{
    "name": "sample customar4",
    "password": "123455",
    "mobileNo": "9999933336",
    "email":"customer4@gmail.com",
    "address":"Bardhaman, West Bengal, India"
} 

###
* GET   /customers