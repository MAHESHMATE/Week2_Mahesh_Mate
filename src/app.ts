import express = require('express');
import { Application, Request, Response } from 'express';
import { storeOrder } from './service';
import {
    concatArrays,
    pushElement,
    popElement,
    mapArray,
    filterArray,
    forEachArray,
    findElement,
    findIndexElement,
    someElement,
    everyElement,
    includesElement,
    indexOfElement,
    lastIndexOfElement,
    spliceArray,
    sliceArray,
    shiftElement,
    unshiftElement,
    flatArray,
    joinArray,
    arrayToString,
    splitString,
    replaceElements,
} from './service';
import { filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge } from './service';
import { addEntityToTable } from './service';

const app = express();
app.use(express.json());

//-----------------------------Q1--------------------------------------------------
// API endpoint for processing payload
async function processPayload(payload: any): Promise<void> {
    try {
        for (const order of payload.items) {
            const hasDivisibleLineNo = order.OrderBlocks.some((block: any) => {
                if (Array.isArray(block.lineNo)) {
                    return block.lineNo.some((lineNo: number) => lineNo % 3 === 0);
                } else {
                    return block.lineNo % 3 === 0;
                }
            });

            if (!hasDivisibleLineNo) {
                await storeOrder(order.orderID);
            }
        }
    } catch (error) {
        console.error('Error processing payload:', error);
        throw error;
    }
}

// Example of using the processPayload function
app.post('/process-payload', async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        await processPayload(payload);
        res.send('Payload processed successfully.');
    } catch (error) {
        console.error('Error processing payload:', error);
        res.status(500).send('Error processing payload.');
    }
});

//--------------------------------------------Q2----------------------------------------
// API endpoint for array operations
app.post('/array-operations', (req: Request, res: Response) => {
    try {
        const payload: any = req.body;

        // Example array
        const exampleArray = [1, 2, 3, 4, 5];

        // Perform array operations
        const operationsResult = {
            concatenatedArray: concatArrays(exampleArray, payload),
            poppedElement: popElement(exampleArray),
            mappedArray: mapArray(exampleArray, (x) => x * 2),
            filteredArray: filterArray(exampleArray, (x) => x % 2 === 0),
            foundElement: findElement(exampleArray, (x) => x === 3),
            foundIndex: findIndexElement(exampleArray, (x) => x === 3),
            isSomeElement: someElement(exampleArray, (x) => x > 5),
            isEveryElement: everyElement(exampleArray, (x) => x > 0),
            isElementIncluded: includesElement(exampleArray, 3),
            firstIndexOfElement: indexOfElement(exampleArray, 3),
            lastIndexOfElement: lastIndexOfElement(exampleArray, 3),
            splicedArray: spliceArray(exampleArray, 1, 2),
            slicedArray: sliceArray(exampleArray, 1, 3),
            shiftedElement: shiftElement(exampleArray),
            unshiftedLength: unshiftElement(exampleArray, 0),
            flattenedArray: flatArray([1, [2, 3], [4, [5]]]),
            joinedString: joinArray(exampleArray),
            arrayToString: arrayToString(exampleArray),
            splitString: splitString('Hello,World', ','),
            replacedArray: replaceElements(exampleArray, 1, 2, 6, 7),
        };

        res.json(operationsResult);
    } catch (error) {
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
app.get('/passed-students', (req: Request, res: Response) => {
    const passedStudents = filterPassedStudents(students);
    res.json(passedStudents);
});

// API endpoint for getting student names
app.get('/student-names', (req: Request, res: Response) => {
    const studentNames = getStudentNames(students);
    res.json(studentNames);
});

// API endpoint for sorting students by grade
app.get('/sorted-students', (req: Request, res: Response) => {
    const sortedStudents = sortStudentsByGrade(students);
    res.json(sortedStudents);
});

// API endpoint for getting average age of students
app.get('/average-age', (req: Request, res: Response) => {
    const averageAge = getAverageAge(students);
    res.json({ averageAge });
});

//---------------------------------------Q5----------------------------------------------
// Route to add entity to table
app.post('/add-entity', async (req: Request, res: Response) => {
    try {
        const tableName = 'student'; // Specified the table name
        const entityData = req.body; // Assuming the entity data is sent in the request body

        // Add entity to the table
        await addEntityToTable(tableName, entityData);

        res.send('Entity added successfully.');
    } catch (error) {
        console.error('Error adding entity to table:', error);
        res.status(500).send('Error adding entity to table');
    }
});

// Start the server
app.listen(3000, () => {
    console.log(`Server is running on port`);
});