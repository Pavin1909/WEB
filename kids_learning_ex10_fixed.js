
print("KIDS LEARNING WEBSITE - EXPERIMENT 10");

const database = db.getSiblingDB("kidsLearningDB");

if (!database.getCollectionNames().includes("students")) {
    database.createCollection("students");
}

// Clear previous sample records
database.students.deleteMany({
    student_id: { $in: [101, 102, 103, 104] }
});

// INSERT OPERATIONS
database.students.insertMany([
    {
        student_id: 101,
        name: "Arun",
        age: 8,
        class: "Grade 3",
        course: "Mathematics",
        progress: 85,
        skills: ["Numbers", "Addition"]
    },
    {
        student_id: 102,
        name: "Priya",
        age: 7,
        class: "Grade 2",
        course: "English",
        progress: 90,
        skills: ["Reading", "Writing"]
    },
    {
        student_id: 103,
        name: "Rahul",
        age: 9,
        class: "Grade 4",
        course: "Science",
        progress: 70,
        skills: ["Plants", "Animals"]
    },
    {
        student_id: 104,
        name: "Meena",
        age: 8,
        class: "Grade 3",
        course: "Computer",
        progress: 95,
        skills: ["Drawing", "Typing"]
    }
]);

// READ OPERATIONS
print("All Students:");
printjson(database.students.find().toArray());

print("Mathematics Students:");
printjson(database.students.find({course: "Mathematics"}).toArray());

print("Progress above 80:");
printjson(database.students.find({progress: {$gte: 80}}).toArray());

print("Science or English:");
printjson(database.students.find({
    $or: [{course: "Science"}, {course: "English"}]
}).toArray());

print("Reading Skill:");
printjson(database.students.find({skills: "Reading"}).toArray());

print("Selected Fields:");
printjson(database.students.find(
    {},
    {name: 1, course: 1, progress: 1, _id: 0}
).toArray());

print("One Student:");
printjson(database.students.findOne({student_id: 101}));

print("Mathematics Count:");
print(database.students.countDocuments({course: "Mathematics"}));

// UPDATE OPERATIONS
database.students.updateOne(
    {student_id: 101},
    {$set: {progress: 95, course: "Advanced Mathematics"}}
);

database.students.updateMany(
    {class: "Grade 3"},
    {$push: {skills: "Problem Solving"}}
);

database.students.updateOne(
    {student_id: 102},
    {$inc: {age: 1}}
);

// INDEXING
database.students.createIndex(
    {student_id: 1},
    {unique: true}
);

print("Indexes:");
printjson(database.students.getIndexes());

// DELETE OPERATIONS
database.students.deleteOne({student_id: 104});

database.students.deleteMany({progress: {$lt: 75}});

print("Remaining Students:");
printjson(database.students.find().toArray());

print("EXPERIMENT 10 COMPLETED SUCCESSFULLY");
