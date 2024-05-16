"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const service_1 = require("./service");
const service_2 = require("./service");
const service_3 = require("./service");
const service_4 = require("./service");
const app = express();
app.use(express.json());
//-----------------------------Q1--------------------------------------------------
// API endpoint for processing payload
function processPayload(payload) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            for (const order of payload.items) {
                const hasDivisibleLineNo = order.OrderBlocks.some((block) => {
                    if (Array.isArray(block.lineNo)) {
                        return block.lineNo.some((lineNo) => lineNo % 3 === 0);
                    }
                    else {
                        return block.lineNo % 3 === 0;
                    }
                });
                if (!hasDivisibleLineNo) {
                    yield (0, service_1.storeOrder)(order.orderID);
                }
            }
        }
        catch (error) {
            console.error('Error processing payload:', error);
            throw error;
        }
    });
}
// Example of using the processPayload function
app.post('/process-payload', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        yield processPayload(payload);
        res.send('Payload processed successfully.');
    }
    catch (error) {
        console.error('Error processing payload:', error);
        res.status(500).send('Error processing payload.');
    }
}));
//--------------------------------------------Q2----------------------------------------
// API endpoint for array operations
app.post('/array-operations', (req, res) => {
    try {
        const payload = req.body;
        // Example array
        const exampleArray = [1, 2, 3, 4, 5];
        // Perform array operations
        const operationsResult = {
            concatenatedArray: (0, service_2.concatArrays)(exampleArray, payload),
            poppedElement: (0, service_2.popElement)(exampleArray),
            mappedArray: (0, service_2.mapArray)(exampleArray, (x) => x * 2),
            filteredArray: (0, service_2.filterArray)(exampleArray, (x) => x % 2 === 0),
            foundElement: (0, service_2.findElement)(exampleArray, (x) => x === 3),
            foundIndex: (0, service_2.findIndexElement)(exampleArray, (x) => x === 3),
            isSomeElement: (0, service_2.someElement)(exampleArray, (x) => x > 5),
            isEveryElement: (0, service_2.everyElement)(exampleArray, (x) => x > 0),
            isElementIncluded: (0, service_2.includesElement)(exampleArray, 3),
            firstIndexOfElement: (0, service_2.indexOfElement)(exampleArray, 3),
            lastIndexOfElement: (0, service_2.lastIndexOfElement)(exampleArray, 3),
            splicedArray: (0, service_2.spliceArray)(exampleArray, 1, 2),
            slicedArray: (0, service_2.sliceArray)(exampleArray, 1, 3),
            shiftedElement: (0, service_2.shiftElement)(exampleArray),
            unshiftedLength: (0, service_2.unshiftElement)(exampleArray, 0),
            flattenedArray: (0, service_2.flatArray)([1, [2, 3], [4, [5]]]),
            joinedString: (0, service_2.joinArray)(exampleArray),
            arrayToString: (0, service_2.arrayToString)(exampleArray),
            splitString: (0, service_2.splitString)('Hello,World', ','),
            replacedArray: (0, service_2.replaceElements)(exampleArray, 1, 2, 6, 7),
        };
        res.json(operationsResult);
    }
    catch (error) {
        console.error('Error processing array operations:', error);
        res.status(500).send("Error processing array operations");
    }
});
//------------------------------------------Q4--------------------------------------------
// Sample data
const students = [
    { name: "Alice", age: 20, grade: 75 },
    { name: "Bob", age: 22, grade: 85 },
    { name: "Charlie", age: 21, grade: 60 },
    { name: "David", age: 19, grade: 45 },
    { name: "Eve", age: 20, grade: 90 }
];
// API endpoint for filtering passed students
app.get('/passed-students', (req, res) => {
    const passedStudents = (0, service_3.filterPassedStudents)(students);
    res.json(passedStudents);
});
// API endpoint for getting student names
app.get('/student-names', (req, res) => {
    const studentNames = (0, service_3.getStudentNames)(students);
    res.json(studentNames);
});
// API endpoint for sorting students by grade
app.get('/sorted-students', (req, res) => {
    const sortedStudents = (0, service_3.sortStudentsByGrade)(students);
    res.json(sortedStudents);
});
// API endpoint for getting average age of students
app.get('/average-age', (req, res) => {
    const averageAge = (0, service_3.getAverageAge)(students);
    res.json({ averageAge });
});
//---------------------------------------Q5----------------------------------------------
// Route to add entity to table
app.post('/add-entity', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tableName = 'student'; // Specify the table name
        const entityData = req.body; // Assuming the entity data is sent in the request body
        // Add entity to the table
        yield (0, service_4.addEntityToTable)(tableName, entityData);
        res.send('Entity added successfully.');
    }
    catch (error) {
        console.error('Error adding entity to table:', error);
        res.status(500).send('Error adding entity to table');
    }
}));
// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port`);
});
//# sourceMappingURL=app.js.map