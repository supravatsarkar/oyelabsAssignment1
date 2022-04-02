## Phone number Login and customer add API
- Default Admin mobileNo: 9851650495, password: 123456
### Endpoints
* POST   https://transparent-peppered-galliform.glitch.me/login
content-type: application/json
{
    "mobileNo": "9851650495",
    "password": "123456"
} 


* POST   https://transparent-peppered-galliform.glitch.me/addCustomer?userMobileNo=9851650495
content-type: application/json
{
    "name": "sample customar4",
    "password": "123455",
    "mobileNo": "9999933336",
    "email":"customer4@gmail.com",
    "address":"Bardhaman, West Bengal, India"
} 

###
* GET   https://transparent-peppered-galliform.glitch.me/customers