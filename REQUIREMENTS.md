# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- [OPTIONAL] Top 5 most popular products 
- [OPTIONAL] Products by category (args: product category)

#### Users
- Index [token required]
- Show [token required]
- Create N[token required]

#### Orders
- Current Order by user (args: user id)[token required]
- [OPTIONAL] Completed Orders by user (args: user id)[token required]

## RESTful Routes
#### Products
- Index - 'products/' [GET]
- Show - 'products/:id' [GET]
- Create - 'products/' [POST] (token)

#### Users
- Index - 'users/' [GET] (token)
- Show - 'users/:id' [GET] (token)
- Create - 'users/' [POST] (token)

#### Orders
- Index - 'orders/:id' [GET] (token)
- Current Order by user (args: user id) - '/orders/current/:id'[GET] (token)

## Data Shapes
#### Product
-  id
- name
- price
- [OPTIONAL] category

#### User
- id
- firstName
- lastName
- password

#### Orders
- id
- id of each product in the order
- quantity of each product in the order
- user_id
- status of order (active or complete)

## Tables
#### Product
Table: products(id: varchar[primary key],name: varchar,price: number, category: varchar)

#### User
Table: users(id: serial[primary key], first_name: varchar, last_name: varchar, user_password: varchar)

#### Orders
Table: order_products(id: varchar[primary key], quantity: number, status: varchar, product_id: varchar [foreign key from products table],user_id: varchar [foreign key from users table])

