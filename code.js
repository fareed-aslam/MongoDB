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

// =======================================================
//   COMPLETE MONGODB ASSIGNMENT – ONE SINGLE FILE
// =======================================================

// -------------------------------------------------------
// PART 1: BOOKS TASKS
// -------------------------------------------------------

// 1. Count Books by a Specific Author (George Orwell)
db.books.countDocuments({ author: "George Orwell" });

// 2. Find Books Published After 2000
db.books.find({ publication_year: { $gt: 2000 } });

// 3. Update the Genre of “The Catcher in the Rye”
db.books.updateOne(
  { title: "The Catcher in the Rye" },
  { $set: { genre: "Classic Fiction" } }
);

// 4. Increase Rating of All Books by 0.5
db.books.updateMany({}, { $inc: { rating: 0.5 } });

// 5. Text Search "Great"
db.books.createIndex({ title: "text", author: "text" });
db.books.find({ $text: { $search: "Great" } });

// 6. Sort Books by Publication Year (Descending)
db.books.find().sort({ publication_year: -1 });

// 7. Get Average Publication Year by Genre
db.books.aggregate([
  { $group: { _id: "$genre", avgYear: { $avg: "$publication_year" } } }
]);

// 8. Add Field "available" to All Books (true)
db.books.updateMany({}, { $set: { available: true } });

// 9. Delete Books Published Before 1950
db.books.deleteMany({ publication_year: { $lt: 1950 } });

// 10. List All Unique Genres
db.books.distinct("genre");


// -------------------------------------------------------
// PART 2: SchoolDB – STUDENTS + COURSES
// -------------------------------------------------------

// 1. Create DB
use SchoolDB;

// 2. Create Collections
db.createCollection("Students");
db.createCollection("Courses");

// 3. Insert Students
db.Students.insertMany([
  { studentId: 1, name: "Alice", age: 21, math: 88, science: 92 },
  { studentId: 2, name: "Bob", age: 22, math: 75, science: 85 },
  { studentId: 3, name: "Charlie", age: 23, math: 90, science: 78 },
  { studentId: 4, name: "Daisy", age: 20, math: 80, science: 70 }
]);

// 4. Insert Courses
db.Courses.insertMany([
  {
    courseId: 101,
    name: "Math 101",
    instructor: "Dr. Adams",
    studentsEnrolled: [1, 2, 3]
  },
  {
    courseId: 102,
    name: "Science 101",
    instructor: "Dr. Smith",
    studentsEnrolled: [2, 4]
  }
]);

// 5. findOne Queries

// Student with math >= 85 and age < 22
db.Students.findOne({ math: { $gte: 85 }, age: { $lt: 22 } });

// Course where studentsEnrolled includes 3 and instructor is Dr. Adams
db.Courses.findOne({
  studentsEnrolled: 3,
  instructor: "Dr. Adams"
});

// 6. find Queries

// Students: math >= 80 AND science < 90
db.Students.find({ math: { $gte: 80 }, science: { $lt: 90 } });

// Students age < 23 OR math >= 85
db.Students.find({ $or: [{ age: { $lt: 23 } }, { math: { $gte: 85 } }] });

// science >= 80 AND (math < 75 OR age > 22)
db.Students.find({
  science: { $gte: 80 },
  $or: [{ math: { $lt: 75 } }, { age: { $gt: 22 } }]
});

// 7. updateOne

// Increase Bob’s science score where math >= 75
db.Students.updateOne(
  { name: "Bob", math: { $gte: 75 } },
  { $inc: { science: 5 } }
);

// 8. updateMany

// math +5 for students with science < 80 AND age > 22
db.Students.updateMany(
  { science: { $lt: 80 }, age: { $gt: 22 } },
  { $inc: { math: 5 } }
);

// 9. deleteOne

// Delete Daisy where science < 80
db.Students.deleteOne({ name: "Daisy", science: { $lt: 80 } });

// 10. deleteMany

// Remove courses where student 2 enrolled OR instructor is Dr. Smith
db.Courses.deleteMany({
  $or: [{ studentsEnrolled: 2 }, { instructor: "Dr. Smith" }]
});

// 11. Drop Students
db.Students.drop();

// 12. Drop Courses
db.Courses.drop();

// 13. Delete DATABASE
db.dropDatabase();


// -------------------------------------------------------
// PART 3: PAGE 17–23 EXTRA DEMO COMMANDS
// (Teacher ke examples SAME format me include)
// -------------------------------------------------------

// Count All Documents
db.books.countDocuments();

// Count books after 2000
db.books.countDocuments({ publication_year: { $gt: 2000 } });

// Sort Ascending
db.books.find().sort({ publication_year: 1 });

// Sort Desc publication_year + asc title
db.books.find().sort({ publication_year: -1, title: 1 });

// Limit
db.books.find().limit(5);

// Skip
db.books.find().skip(3);

// Pagination
db.books.find().skip(5).limit(5);

// Aggregation: Average publication year
db.books.aggregate([
  { $group: { _id: null, avgPublicationYear: { $avg: "$publication_year" } } }
]);

// Count books per genre
db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } }
]);

// Sort genres by count
db.books.aggregate([
  { $group: { _id: "$genre", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
]);

// Projection: only title + author
db.books.find({}, { title: 1, author: 1, _id: 0 });

// Exclude ISBN
db.books.find({}, { ISBN: 0 });

// Text search
db.books.createIndex({ title: "text", author: "text" });
db.books.find({ $text: { $search: "Road" } });

// Regex — title starts with "The"
db.books.find({ title: { $regex: "^The", $options: "i" } });

// Regex — author ends with Lee
db.books.find({ author: { $regex: "Lee$", $options: "i" } });

// Increase rating of all books
db.books.updateMany({}, { $inc: { rating: 1 } });

// Decrease publication year of "1984"
db.books.updateOne(
  { title: "1984" },
  { $inc: { publication_year: -5 } }
);

// findOneAndUpdate
db.books.findOneAndUpdate(
  { title: "The Great Gatsby" },
  { $set: { genre: "Classic" } },
  { returnNewDocument: true }
);

// findOneAndDelete
db.books.findOneAndDelete({ title: "The Catcher in the Rye" });

