# Ecommerce API

**Definition**

Assalamu alaikum everyone, this an API template for your ecommerce website. It contains Authentification, Orders, Products, Users and reviews.

**Usage**

Very simple, Clone this repository and first, you should create a _config.env_ file to put envirement variables:

> Setup

```
-NODE_ENV= production Or development
-PORT= YOUR_PORT
-DATABASE= MONGODB_LINK
-DATABASE_PASSWORD= MONGODB_PASSWORD

-JWT_SECRET
-JWT_EXPIRES_IN= WHEN JWT EXPIRES
-JWT_COOKIE_EXPIRES_IN= WHEN COOKIE EXPIRES IN
```

> Google O Auth

```
-GOOGLE_CLIENT_ID= GOOGLE CLIENT ID
-GOOGLE_CLIENT_SECRET= GOOGLE CLIENT SECRET
-GOOGLE_CALLBACK_URL = GOOGLE CALLBACK URL
```

> Facebook Auth

```
-FACEBOOK_CLIENT_ID = FACEBOOK CLIENT ID
-FACEBOOK_CLIENT_SECRET = FACEBOOK CLIENT SECRET
-FACEBOOK_CALLBACK_URL = FACEBOOK CALLBACK URL
```

> Front-End

**Users**

1. Solve rem issue, check '/prodcuts/:slug' page.
2. Design:
   .the Error page and message
   .Order added page
   .Dashboard page
3. Re-Design Product Details page '/prodcuts/:slug'

**Admin**

4. Design Dashboard account. With Back-end features.

> Back-End

1. Solve the add to cart issue, whenever product is added, the provious ones are deleted, maybe the issue is in 'cartController, editCart function, line 57

**Admin**:

. Login with 2 Step Authentification.
. See Orders.
. Mark order as confirmed, shipped, canceled.
. See best working employees ( whenever an employee adds cinfirms an Order add him to the List )
. Have a Financial report:
. Yearly, Weekly, Today sales.
. Make a Target Figures wanted and have a big counter that counts left sales
eg: 7 Figures monthly wanted, cuurent monthly figure is: $200.000,00 so there is $800.000,00 left, with 5 days to the end of the month.
