# Class 09 --- API Server

## Lecture Videos

[Saturday Morning](https://www.youtube.com/watch?v=2uAv4As0eSU) || [Saturday Afternoon](https://www.youtube.com/watch?v=LAZSEGCtcQg)

## Lecture Overview

While writing our Express servers, we saw first-hand the power of `params` (parameters stored in the URL path) within a request. This is the main way we were able to manipulate records of a certain id; the client added the id into the URL path for the server to consume. In this class, we'll learn how to take more advantage of this `params` capability. 

Another avenue we'll cover is how to improve our Mongoose middleware so that we can bypass some of the annoyances of a non-relational database such as MongoDB. We'll add the idea of "virtual joins" to our database, treating our non-relational structure in a more relational manner. 

At the end of this class, you'll be able to:

-   [x] Understand Mongoose virtual joins
-   [x] Understand Mongoose sub documents
-   [x] Understand Express request `param` object in more detail
-   [x] Manage the lifecycle of your data model with pre and post middleware 
-   [x] Use param middleware to create dynamic model routes

Prior to class, review the readings below and answer the discussion questions in your reading repository.

## Reading

In Express, we've had some experience getting path parameters to be read: 

```javascript
app.get('/products/:id', (req, res, next) => {
  // req.params.id is now a readable value
})
```

What else can we do with this `params` object? Well, one consideration we might want to make is to run a specific middleware whenever a parameter key-value is present. We can do that using `app.param` or `router.param` (note the lack of an ending `s`). 

```javascript
app.param('id', (req, res, next) => {
  // this middleware will only run on routes
  // where req.params.id is defined! 
})
```

This ability to add specific middleware depending on if `req.params` has a key-value set, is immensely powerful. It can be particularly useful for validating or formatting the `req.params` key-value before that value is consumed by a `GET`, `POST`, `PUT`, or `DELETE` route. 

Let's turn our attention back to MongoDB and Mongoose. Remember, MongoDB is a *non-relational* database, meaning that it doesn't do much to impose any structure upon its data. We use the helper package Mongoose to enforce a structure, ensuring any modified or new data conforms to a schema. 

But what about creating an actual *relation* in our data? For example, if we have two collections called products and categories, we might say they are related because each. product belongs to a category. When we get information about a single product, we might also want to get information about the category it belongs to as well. How can we tell Mongoose to connect these two individual collections together without manually copying category data into each product record? 

The `populate()` method allows us to connect 2 collections, either through a field reference or through something called virtual population. Let's talk about doing it using a reference first. 

Suppose you have the following sample data: 

```javascript
// Products 
{
  _id: '1',
  name: 'dishwasher',
  category: '1',
  price: 139.99,
  stock: 43
}

{
  _id: '2',
  name: 'television',
  category: '2',
  price: 432.12,
  stock: 22
}

{
  _id: '3',
  name: 'stereo',
  category: '2',
  price: 45.55,
  stock: 12
}
```

```javascript
// Categories
{
  _id: '1'
  name: 'kitchen', 
  department: 'housewares', 
  aisle: 12, 
  manager: 'Sarah Smalls'
}

{
  _id: '2'
  name: 'entertainment', 
  department: 'electronics', 
  aisle: 4, 
  manager: 'Billy Biggs'
}
```

If you wanted to relate products and categories, you can see that given a product, the `category` field should match a given category's `_id`. You can define this relationship within a Mongoose schema as follows: 

```javascript
const categorySchema = mongoose.Schema({
  name: { type: 'String' },
  department: { type: 'String' },
  aisle: { type: 'Number' },
  manager: { type: 'String' }
});

const productSchema = mongoose.Schema({
  name: { type: 'String' },
  category: { type: mongoose.ObjectId, ref: 'categories' },
  price: { type: 'Number' }, 
});
```

Here, in the product schema we are defining a field `category` which is going to be an id of a record in the `categories` collection. We can then use `populate()` to have Mongoose replace this id with the full record! 

Finally, you can also use **virtual joins** to connect two collections. This can be beneficial if you don't want to store the category id in a product's `category` field. For example, what if instead you wanted to store the category name? 

```javascript
// Products 
{
  _id: '1',
  name: 'dishwasher',
  category: 'kitchen',
  price: 139.99,
  stock: 43
}

{
  _id: '2',
  name: 'television',
  category: 'entertainment',
  price: 432.12,
  stock: 22
}

{
  _id: '3',
  name: 'stereo',
  category: 'entertainment',
  price: 45.55,
  stock: 12
}
```

This can be very beneficial for an application - after all, names are much easier to read and understand than ids. In this scenario, we want to tell Mongoose that the `product.category` field is equivalent to some `category.name` field. This is where virtual joins come in. 

```javascript
const categorySchema = mongoose.Schema({
  name: { type: 'String' },
  department: { type: 'String' },
  aisle: { type: 'Number' },
  manager: { type: 'String' }
});

const productSchema = mongoose.Schema({
  name: { type: 'String' },
  price: { type: 'Number' }, 
}, { toObject: { virtuals: true }}, { toJSON: { virtuals: true }});

productSchema.virtual('category', {
  ref: 'categories', 
  localField: 'category', 
  foreignField: 'name', 
  justOne: true, 
}); 

productsSchema.pre('find', function() {
  this.populate('category'); 
})
```

There's a lot going on in this above code, but let's break it down a bit. First, within the `productsSchema`, we no longer explicitly define a `category` field. Instead, we prep this schema to deal with virtual fields. The ending `toObject` and `toJSON` content is primarily for Mongoose to understand how to convert fields when access data from MongoDB. 

Below the schema, we add a virtual property called `category`. We define that this is a reference to a record from the `categories` collection, and we say that the local field within a product record will map to some foreign field within a category record. Finally, we say that when attempting to get this category record, we only expect one record to match, instead of a list of records. 

Finally, we do some `pre` middleware on the `find` function, so that before the record is fully found and returned, we actually populate the virtual field, replacing a string name with the entire matching category record. 

Through this process of virtual joins or joins by reference, we can add some relational structure to our non-relational database. 

### External Reading / Viewing

Save or skim through the following links to help broaden your understanding.

| Links                                                        |
| ------------------------------------------------------------ |
| [Express app.param() Middleware](https://expressjs.com/en/api.html#app.param) |
| [Express router.param() Middleware](https://expressjs.com/en/api.html#router.param) |
| [Mongoose Middleware](https://mongoosejs.com/docs/middleware.html) |
| [Mongoose Sub-Documents](https://mongoosejs.com/docs/subdocs.html) |
| [Mongoose Virtual Joins](https://mongoosejs.com/docs/populate.html#populate-virtuals) |

### Vocabulary

Familiarize yourself with the following vocabulary terms. We will be covering their definitions in class.

| Term         |
| ------------ |
| virtual      |
| getter       |
| setter       |
| sub document |
| reference    |
| relation     |
| join         |

### Handy Code Snippets

Feel free to skim these code snippets, they are mainly here for your reference after class lectures.

#### Middleware Based on `req.params`

```javascript
app.param('id', (req, res, next) => {
  // this middleware will only run on routes
  // where req.params.id is defined! 
})
```

## Discussion Questions

Create a new markdown page in your reading notes repo for this class. On that page, answer the following questions. You will not be graded on correctness, but rather on your attempt to answer the question. Once you've created your new page, submit a link to that page using the canvas discussion entry field. Links should be somewhat of the format `https://USERNAME.github.io/reading-notes/class-##-reading`.

1. Describe a use-case where param middleware would come in handy. 
2. What are the two ways to add middleware in-between Mongoose and MongoDB interactions? 
3. What is the difference between a join by reference and a virtual join? 
4. What do `localField` and `foreignField` mean? 
