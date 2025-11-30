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

// ============================
//  MongoDB CRUD FULL PRACTICE
//  Collection: students
// ============================


// ============================
// 1. INSERT STUDENTS
// ============================

db.students.insertMany([
  {
    roll_no: 101,
    name: "Ali Khan",
    age: 22,
    department: "CS",
    cgpa: 3.1,
    scholarship: true,
    courses: ["DBMS", "OOP", "AI"],
    address: { city: "Karachi", postal_code: 74200 }
  },
  {
    roll_no: 102,
    name: "Hassan Ahmed",
    age: 21,
    department: "CS",
    cgpa: 2.9,
    scholarship: false,
    courses: ["OOP", "DSA"],
    address: { city: "Lahore", postal_code: 54000 }
  },
  {
    roll_no: 103,
    name: "Sara Malik",
    age: 23,
    department: "EE",
    cgpa: 3.8,
    scholarship: true,
    courses: ["Circuits", "AI"],
    address: { city: "Islamabad", postal_code: 44000 }
  },
  {
    roll_no: 104,
    name: "Ahmed Raza",
    age: 20,
    department: "BBA",
    cgpa: 2.5,
    scholarship: false,
    courses: ["Marketing", "Finance"],
    address: { city: "Karachi", postal_code: 74200 }
  },
  {
    roll_no: 105,
    name: "Zain Ali",
    age: 24,
    department: "CS",
    cgpa: 3.6,
    scholarship: true,
    courses: ["DBMS", "AI", "Cloud"],
    address: { city: "Lahore", postal_code: 54000 }
  },
  {
    roll_no: 106,
    name: "Waqas Iqbal",
    age: 22,
    department: "IT",
    cgpa: 2.1,
    scholarship: false,
    courses: ["Networking"],
    address: { city: "Faisalabad", postal_code: 38000 }
  },
  {
    roll_no: 107,
    name: "Ayesha Khan",
    age: 21,
    department: "CS",
    cgpa: 3.9,
    scholarship: true,
    courses: ["AI", "DSA"],
    address: { city: "Karachi", postal_code: 74200 }
  },
  {
    roll_no: 108,
    name: "Bilal Ahmed",
    age: 25,
    department: "EE",
    cgpa: 2.7,
    scholarship: false,
    courses: ["Electronics"],
    address: { city: "Rawalpindi", postal_code: 46000 }
  },
  {
    roll_no: 109,
    name: "Murtaza Siddiq",
    age: 23,
    department: "IT",
    cgpa: 3.2,
    scholarship: false,
    courses: ["Networking", "Cloud"],
    address: { city: "Karachi", postal_code: 74200 }
  },
  {
    roll_no: 110,
    name: "Arslan Noor",
    age: 22,
    department: "BBA",
    cgpa: 2.0,
    scholarship: false,
    courses: ["Finance"],
    address: { city: "Lahore", postal_code: 54000 }
  }
]);


// ============================
// 2. FIND QUERIES
// ============================

// CS department students
db.students.find({ department: "CS" });

// CGPA > 3.2
db.students.find({ cgpa: { $gt: 3.2 } });

// Karachi OR Lahore
db.students.find({
  $or: [{ "address.city": "Karachi" }, { "address.city": "Lahore" }]
});

// Students who have taken AI
db.students.find({ courses: "AI" });

// Age between 20 and 25
db.students.find({ age: { $gte: 20, $lte: 25 } });

// Scholarship = true and CGPA ≥ 3.0
db.students.find({
  scholarship: true,
  cgpa: { $gte: 3 }
});

// Not EE
db.students.find({ department: { $ne: "EE" } });

// Top 5 CGPA students (desc)
db.students.find().sort({ cgpa: -1 }).limit(5);

// Sort by name ASC
db.students.find().sort({ name: 1 });

// CS + Karachi + CGPA > 3.0
db.students.find({
  department: "CS",
  "address.city": "Karachi",
  cgpa: { $gt: 3 }
});

// Students having both OOP & DBMS
db.students.find({
  courses: { $all: ["OOP", "DBMS"] }
});


// ============================
// 3. UPDATE QUERIES
// ============================

// Update CGPA of roll_no 102
db.students.updateOne(
  { roll_no: 102 },
  { $set: { cgpa: 3.9 } }
);

// Scholarship = true for CGPA > 3.5
db.students.updateMany(
  { cgpa: { $gt: 3.5 } },
  { $set: { scholarship: true } }
);

// Add new course to all CS students
db.students.updateMany(
  { department: "CS" },
  { $push: { courses: "Cloud Computing" } }
);

// Replace address of roll_no 105
db.students.updateOne(
  { roll_no: 105 },
  {
    $set: {
      address: {
        city: "Islamabad",
        postal_code: 44000
      }
    }
  }
);

// Increase CGPA by 0.2 for Lahore students
db.students.updateMany(
  { "address.city": "Lahore" },
  { $inc: { cgpa: 0.2 } }
);

// Change department BBA → Management Sciences
db.students.updateMany(
  { department: "BBA" },
  { $set: { department: "Management Sciences" } }
);

// Remove AI from all students
db.students.updateMany({}, { $pull: { courses: "AI" } });


// ============================
// 4. DELETE QUERIES
// ============================

// Delete CGPA < 2.0
db.students.deleteMany({ cgpa: { $lt: 2 } });

// Delete IT students without scholarship
db.students.deleteMany({
  department: "IT",
  scholarship: false
});

// Delete roll_no 110
db.students.deleteOne({ roll_no: 110 });


// ============================
// 5. ADVANCED FILTERS
// ============================

// Postal code exists
db.students.find({ "address.postal_code": { $exists: true } });

// Courses array has 3 items
db.students.find({ courses: { $size: 3 } });

// Name starting with A
db.students.find({ name: { $regex: /^A/i } });


// ============================
// 6. NESTED FIELDS
// ============================

// City = Karachi
db.students.find({ "address.city": "Karachi" });

// Update postal code for Lahore
db.students.updateMany(
  { "address.city": "Lahore" },
  { $set: { "address.postal_code": 54000 } }
);


// ============================
// 7. AGGREGATION PIPELINE
// ============================

// Count students per department
db.students.aggregate([
  { $group: { _id: "$department", total: { $sum: 1 } } }
]);

// Avg CGPA of CS
db.students.aggregate([
  { $match: { department: "CS" } },
  { $group: { _id: "CS", avgCgpa: { $avg: "$cgpa" } } }
]);

// Total scholarship students
db.students.aggregate([
  { $match: { scholarship: true } },
  { $count: "totalScholarships" }
]);

// Group by city, sort by count desc
db.students.aggregate([
  { $group: { _id: "$address.city", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]);


// ============================
// 8. BONUS COMPLEX OPS
// ============================

// CGPA 2.5–3.7 AND (Karachi OR AI course)
db.students.find({
  cgpa: { $gte: 2.5, $lte: 3.7 },
  $or: [{ "address.city": "Karachi" }, { courses: "AI" }]
});

// Increase CGPA +0.5 for AI students without scholarship
db.students.updateMany(
  { courses: "AI", scholarship: false },
  { $inc: { cgpa: 0.5 } }
);

// Delete students outside Karachi + Lahore
db.students.deleteMany({
  "address.city": { $nin: ["Karachi", "Lahore"] }
});

// Names ending with "n"
db.students.find({
  name: { $regex: /n$/i }
});

