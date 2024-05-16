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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceElements = exports.splitString = exports.arrayToString = exports.joinArray = exports.flatArray = exports.unshiftElement = exports.shiftElement = exports.sliceArray = exports.spliceArray = exports.lastIndexOfElement = exports.indexOfElement = exports.includesElement = exports.everyElement = exports.someElement = exports.findIndexElement = exports.findElement = exports.forEachArray = exports.filterArray = exports.mapArray = exports.popElement = exports.pushElement = exports.concatArrays = exports.storeOrder = exports.getAverageAge = exports.sortStudentsByGrade = exports.getStudentNames = exports.filterPassedStudents = exports.addEntityToTable = void 0;
const pgConfig_1 = __importDefault(require("./pgConfig"));
//----------------------------------------Q1----------------------------------------
// Function to store an order in the database
function storeOrder(orderID) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = 'INSERT INTO orders (orderID) VALUES ($1)';
            yield pgConfig_1.default.query(query, [orderID]);
        }
        catch (error) {
            console.error('Error storing order:', error);
            throw error;
        }
    });
}
exports.storeOrder = storeOrder;
//--------------------------------------Q2-------------------------------------------
// Concatenate two arrays
function concatArrays(arr1, arr2) {
    return arr1.concat(arr2);
}
exports.concatArrays = concatArrays;
// Push an element into an array
function pushElement(arr, element) {
    arr.push(element);
}
exports.pushElement = pushElement;
// Remove and return the last element of an array
function popElement(arr) {
    return arr.pop();
}
exports.popElement = popElement;
// Create a new array by applying a function to each element of the original array
function mapArray(arr, callback) {
    return arr.map(callback);
}
exports.mapArray = mapArray;
// Create a new array with all elements that pass the test implemented by the provided function
function filterArray(arr, callback) {
    return arr.filter(callback);
}
exports.filterArray = filterArray;
// Execute a provided function once for each array element
function forEachArray(arr, callback) {
    arr.forEach(callback);
}
exports.forEachArray = forEachArray;
// Find the first element that satisfies the provided testing function
function findElement(arr, callback) {
    return arr.find(callback);
}
exports.findElement = findElement;
// Find the index of the first element that satisfies the provided testing function
function findIndexElement(arr, callback) {
    return arr.findIndex(callback);
}
exports.findIndexElement = findIndexElement;
// Check if at least one element in the array passes the test
function someElement(arr, callback) {
    return arr.some(callback);
}
exports.someElement = someElement;
// Check if all elements in the array pass the test
function everyElement(arr, callback) {
    return arr.every(callback);
}
exports.everyElement = everyElement;
// Check if the array includes a certain element
function includesElement(arr, element) {
    return arr.includes(element);
}
exports.includesElement = includesElement;
// Find the index of the first occurrence of a value in the array
function indexOfElement(arr, element) {
    return arr.indexOf(element);
}
exports.indexOfElement = indexOfElement;
// Find the index of the last occurrence of a value in the array
function lastIndexOfElement(arr, element) {
    return arr.lastIndexOf(element);
}
exports.lastIndexOfElement = lastIndexOfElement;
// Add or remove elements from an array
function spliceArray(arr, start, deleteCount, ...items) {
    return arr.splice(start, deleteCount, ...items);
}
exports.spliceArray = spliceArray;
// Extract a section of the array and return a new array
function sliceArray(arr, start, end) {
    return arr.slice(start, end);
}
exports.sliceArray = sliceArray;
// Remove and return the first element of the array
function shiftElement(arr) {
    return arr.shift();
}
exports.shiftElement = shiftElement;
// Add one or more elements to the beginning of the array
function unshiftElement(arr, ...elements) {
    return arr.unshift(...elements);
}
exports.unshiftElement = unshiftElement;
// Flatten a nested array
function flatArray(arr, depth = 1) {
    return arr.flat(depth);
}
exports.flatArray = flatArray;
// Join all elements of an array into a string
function joinArray(arr, separator = ',') {
    return arr.join(separator);
}
exports.joinArray = joinArray;
// Convert an array to a string
function arrayToString(arr) {
    return arr.toString();
}
exports.arrayToString = arrayToString;
// Split a string into an array of substrings
function splitString(str, separator, limit) {
    return str.split(separator, limit);
}
exports.splitString = splitString;
// Replace elements in an array with new elements
function replaceElements(arr, start, deleteCount, ...items) {
    arr.splice(start, deleteCount, ...items);
    return arr;
}
exports.replaceElements = replaceElements;
// Filter passed students
function filterPassedStudents(students) {
    return students.filter(student => student.grade >= 50);
}
exports.filterPassedStudents = filterPassedStudents;
// Get student names
function getStudentNames(students) {
    return students.map(student => student.name);
}
exports.getStudentNames = getStudentNames;
// Sort students by grade
function sortStudentsByGrade(students) {
    return students.slice().sort((a, b) => a.grade - b.grade);
}
exports.sortStudentsByGrade = sortStudentsByGrade;
// Get average age of students
function getAverageAge(students) {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
}
exports.getAverageAge = getAverageAge;
//---------------------------------------------Q5----------------------------------------
// Function to check if a table exists
function tableExists(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const query = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = $1
            )
        `;
            const result = yield pgConfig_1.default.query(query, [tableName]);
            return result.rows[0].exists;
        }
        catch (error) {
            console.error('Error checking table existence:', error);
            throw error;
        }
    });
}
// Function to create the table if it doesn't exist
function createTableIfNotExists(tableName) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const tableExistsResult = yield tableExists(tableName);
            if (!tableExistsResult) {
                // If the table does not exist, create it
                console.log(`Table '${tableName}' does not exist. Creating table...`);
                const createTableQuery = `
                CREATE TABLE ${tableName} (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(255),
                    age INT,
                    grade INT
                )
            `;
                yield pgConfig_1.default.query(createTableQuery);
            }
        }
        catch (error) {
            console.error('Error creating table:', error);
            throw error;
        }
    });
}
// Function to add entity to table
function addEntityToTable(tableName, entityData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Create the table if it doesn't exist
            yield createTableIfNotExists(tableName);
            // Add entity to the table
            console.log(`Adding entity to table '${tableName}'...`);
            const insertQuery = `
            INSERT INTO ${tableName} (name, age, grade)
            VALUES ($1, $2, $3)
        `;
            const { name, age, grade } = entityData;
            yield pgConfig_1.default.query(insertQuery, [name, age, grade]);
            console.log('Entity added successfully.');
        }
        catch (error) {
            console.error('Error adding entity to table:', error);
            throw error;
        }
    });
}
exports.addEntityToTable = addEntityToTable;
//# sourceMappingURL=service.js.map