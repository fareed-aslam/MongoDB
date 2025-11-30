// ================================
//   MONGO DB BOOK STORE QUERIES
// ================================

// Collection: db.books


// ----------------------------------------------------
// 1. Update Technology books (price < 40) → in_stock = false
// ----------------------------------------------------
db.books.updateMany(
  { category: "Technology", price: { $lt: 40 } },
  { $set: { in_stock: false } }
);


// ----------------------------------------------------
// 2. Delete book with book_id = "B008" AND in_stock = false
// ----------------------------------------------------
db.books.deleteOne({
  book_id: "B008",
  in_stock: false
});


// ----------------------------------------------------
// 3. Update John Smith's Technology books price to 35
//    ONLY IF price > 20 AND in_stock = true
// ----------------------------------------------------
db.books.updateMany(
  {
    author: "John Smith",
    category: "Technology",
    price: { $gt: 20 },
    in_stock: true
  },
  { $set: { price: 35 } }
);


// ----------------------------------------------------
// 4. Find Programming books with price > 25 
//    AND in_stock = true, sorted by price DESC
// ----------------------------------------------------
db.books.find(
  {
    category: "Programming",
    price: { $gt: 25 },
    in_stock: true
  }
).sort({ price: -1 });


// ----------------------------------------------------
// 5. Delete books where:
//    (A) category = Programming AND in_stock = false
//           OR
//    (B) price > 50
// ----------------------------------------------------
db.books.deleteMany({
  $or: [
    { category: "Programming", in_stock: false },
    { price: { $gt: 50 } }
  ]
});


// ----------------------------------------------------
// 6. Update price of B005 and B006 to 40 
//    AND set in_stock = true
// ----------------------------------------------------
db.books.updateMany(
  { book_id: { $in: ["B005", "B006"] } },
  { $set: { price: 40, in_stock: true } }
);


// ----------------------------------------------------
// 7. Find books where author = "Jane Doe" OR category = "Database",
//    AND price between 30 and 60
// ----------------------------------------------------
db.books.find({
  $and: [
    {
      $or: [
        { author: "Jane Doe" },
        { category: "Database" }
      ]
    },
    { price: { $gte: 30, $lte: 60 } }
  ]
});


// ----------------------------------------------------
// 8. Update Programming books price = 50 
//    ONLY IF price < 50 AND in_stock = true
// ----------------------------------------------------
db.books.updateMany(
  {
    category: "Programming",
    price: { $lt: 50 },
    in_stock: true
  },
  { $set: { price: 50 } }
);


// ----------------------------------------------------
// 9. Delete books where price < 30 AND category = Technology
//    AND in_stock = false
// ----------------------------------------------------
db.books.deleteMany({
  price: { $lt: 30 },
  category: "Technology",
  in_stock: false
});


// ----------------------------------------------------
// 10. Update title of B010 to "AI Revolution"
//     AND reduce its price by 10%
// ----------------------------------------------------
db.books.updateOne(
  { book_id: "B010" },
  {
    $set: { title: "AI Revolution" },
    $mul: { price: 0.90 }
  }
);

