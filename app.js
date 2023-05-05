const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/studentDataBase');

    // Define course schema
    const courseSchema = new mongoose.Schema({
        courseName: String,
        semester: {
            type: String,
            enum: ["one", "two"]
        }
    });

    // Define student schema
    const studentSchema = new mongoose.Schema({
        first_name: String,
        last_name: String,
        age: {
            type: Number,
            min: 18,
            max: 28
        },
        studentCourse: courseSchema
    });

    // Define student model
    const student = mongoose.model("student", studentSchema);

    // Define course model
    const course = mongoose.model("course", courseSchema);

    // Add sample data
    const ai = new course({
        courseName: "Artificial Intelligence",
        semester: "one"
    });

    const network = new course({
        courseName: "Network Data Communication",
        semester: "two"
    });

    const embeddedSystem = new course({
        courseName: "Embedded System",
        semester: "one"
    });

    const student01 = new student({
        first_name: "Ahmad",
        last_name: "Hamid",
        age: 21,
        studentCourse: ai
    });

    const student02 = new student({
        first_name: "Bilal",
        last_name: "Abdulla",
        age: 22,
        studentCourse: network
    });

    const student03 = new student({
        first_name: "Kawan",
        last_name: "Namiq",
        age: 19,
        studentCourse: embeddedSystem
    });

    // Insert data
    try {
        await course.insertMany([ai, network, embeddedSystem]);
        await student.insertMany([student01, student02, student03]);
        console.log("Data inserted successfully");
    } catch (error) {
        console.error(`Error inserting data: ${error}`);
    }

    // Print all documents
    try {
        const documents = await student.find({});
        console.log(documents);
    } catch (error) {
        console.error(`Error fetching data: ${error}`);
    }

    // Delete documents
    try {
        const result = await student.deleteMany({});
        console.log(`${result.deletedCount} documents deleted`);
    } catch (error) {
        console.error(`Error deleting data: ${error}`);
    }

    // Disconnect from database
    mongoose.connection.close();
}
