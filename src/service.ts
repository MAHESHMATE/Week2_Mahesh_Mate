import pool from './pgConfig';


//----------------------------------------Q1----------------------------------------
// Function to store an order in the database
async function storeOrder(orderID: string): Promise<void> {
    try {
        const query = 'INSERT INTO orders (orderID) VALUES ($1)';
        await pool.query(query, [orderID]);
    } catch (error) {
        console.error('Error storing order:', error);
        throw error;
    }
}

//--------------------------------------Q2-------------------------------------------
// Concatenate two arrays
function concatArrays(arr1: any[], arr2: any[]): any[] {
    return arr1.concat(arr2);
}

// Push an element into an array
function pushElement(arr: any[], element: any): void {
    arr.push(element);
}

// Remove and return the last element of an array
function popElement(arr: any[]): any {
    return arr.pop();
}

// Create a new array by applying a function to each element of the original array
function mapArray(arr: any[], callback: (value: any, index: number, array: any[]) => any): any[] {
    return arr.map(callback);
}

// Create a new array with all elements that pass the test implemented by the provided function
function filterArray(arr: any[], callback: (value: any, index: number, array: any[]) => boolean): any[] {
    return arr.filter(callback);
}

// Execute a provided function once for each array element
function forEachArray(arr: any[], callback: (value: any, index: number, array: any[]) => void): void {
    arr.forEach(callback);
}

// Find the first element that satisfies the provided testing function
function findElement(arr: any[], callback: (value: any, index: number, array: any[]) => boolean): any {
    return arr.find(callback);
}

// Find the index of the first element that satisfies the provided testing function
function findIndexElement(arr: any[], callback: (value: any, index: number, array: any[]) => boolean): number {
    return arr.findIndex(callback);
}

// Check if at least one element in the array passes the test
function someElement(arr: any[], callback: (value: any, index: number, array: any[]) => boolean): boolean {
    return arr.some(callback);
}

// Check if all elements in the array pass the test
function everyElement(arr: any[], callback: (value: any, index: number, array: any[]) => boolean): boolean {
    return arr.every(callback);
}

// Check if the array includes a certain element
function includesElement(arr: any[], element: any): boolean {
    return arr.includes(element);
}

// Find the index of the first occurrence of a value in the array
function indexOfElement(arr: any[], element: any): number {
    return arr.indexOf(element);
}

// Find the index of the last occurrence of a value in the array
function lastIndexOfElement(arr: any[], element: any): number {
    return arr.lastIndexOf(element);
}

// Add or remove elements from an array
function spliceArray(arr: any[], start: number, deleteCount: number, ...items: any[]): any[] {
    return arr.splice(start, deleteCount, ...items);
}

// Extract a section of the array and return a new array
function sliceArray(arr: any[], start?: number, end?: number): any[] {
    return arr.slice(start, end);
}

// Remove and return the first element of the array
function shiftElement(arr: any[]): any {
    return arr.shift();
}

// Add one or more elements to the beginning of the array
function unshiftElement(arr: any[], ...elements: any[]): number {
    return arr.unshift(...elements);
}

// Flatten a nested array
function flatArray(arr: any[], depth: number = 1): any[] {
    return arr.flat(depth);
}

// Join all elements of an array into a string
function joinArray(arr: any[], separator: string = ','): string {
    return arr.join(separator);
}

// Convert an array to a string
function arrayToString(arr: any[]): string {
    return arr.toString();
}

// Split a string into an array of substrings
function splitString(str: string, separator: string | RegExp, limit?: number): string[] {
    return str.split(separator, limit);
}

// Replace elements in an array with new elements
function replaceElements(arr: any[], start: number, deleteCount: number, ...items: any[]): any[] {
    arr.splice(start, deleteCount, ...items);
    return arr;
}

//------------------------------------------Q4---------------------------------------
interface Student {
    name: string;
    age: number;
    grade: number;
}

// Filter passed students
function filterPassedStudents(students: Student[]): Student[] {
    return students.filter(student => student.grade >= 50);
}

// Get student names
function getStudentNames(students: Student[]): string[] {
    return students.map(student => student.name);
}

// Sort students by grade
function sortStudentsByGrade(students: Student[]): Student[] {
    return students.slice().sort((a, b) => a.grade - b.grade);
}

// Get average age of students
function getAverageAge(students: Student[]): number {
    const totalAge = students.reduce((acc, student) => acc + student.age, 0);
    return totalAge / students.length;
}

//---------------------------------------------Q5----------------------------------------
// Function to check if a table exists
async function tableExists(tableName: string): Promise<boolean> {
    try {
        const query = `
            SELECT EXISTS (
                SELECT 1
                FROM information_schema.tables
                WHERE table_name = $1
            )
        `;
        const result = await pool.query(query, [tableName]);
        return result.rows[0].exists;
    } catch (error) {
        console.error('Error checking table existence:', error);
        throw error;
    }
}

// Function to create the table if it doesn't exist
async function createTableIfNotExists(tableName: string): Promise<void> {
    try {
        const tableExistsResult = await tableExists(tableName);
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
            await pool.query(createTableQuery);
        }
    } catch (error) {
        console.error('Error creating table:', error);
        throw error;
    }
}

// Function to add entity to table
async function addEntityToTable(tableName: string, entityData: any): Promise<void> {
    try {
        // Create the table if it doesn't exist
        await createTableIfNotExists(tableName);

        // Add entity to the table
        console.log(`Adding entity to table '${tableName}'...`);
        const insertQuery = `
            INSERT INTO ${tableName} (name, age, grade)
            VALUES ($1, $2, $3)
        `;
        const { name, age, grade } = entityData;
        await pool.query(insertQuery, [name, age, grade]);

        console.log('Entity added successfully.');
    } catch (error) {
        console.error('Error adding entity to table:', error);
        throw error;
    }
}



export { addEntityToTable };
export { filterPassedStudents, getStudentNames, sortStudentsByGrade, getAverageAge };
export { storeOrder };
export {
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
};