# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints

### RESTful Routes
#### Products
- Index - 'products/' [GET]
- Show - 'products/:id' [GET]
- Create - 'products/' [POST] (token)
- Update - '/products/:id' [PUT] (token)
- Delete - '/products/:id' [DELETE] (token)

#### Users
- Index - 'users/' [GET] (token)
- Show - 'users/:id' [GET] (token)
- Create - 'users/' [POST] (token)
- Update - '/users/:id' [PUT] (token)
- Delete - '/users/:id' [DELETE] (token)
- Login - '/users/login' [POST] (receive token)

#### Orders
- Index - 'orders/:id' [GET] (token)
- Current Order by user (args: user id) - '/orders/current/:id'[GET] (token)

## Tables

#### Product
Table: products(id: serial[primary key],name: varchar,price: number)

#### User
Table: users(id: serial[primary key], first_name: varchar, last_name: varchar, user_password: varchar)

#### Orders
Table: orders(id: serial[primary key], status: varchar, user_id: number [foreign key from users table])

#### Order Products
Table: order_products(order_id: number[foreign key from orders table], product_id: varchar [foreign key from products table]), quantity: number

