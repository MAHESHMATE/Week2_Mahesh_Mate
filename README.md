# Week2_Mahesh_Mate

Assignment

1. Use the items list of JSON from the https://blog.postman.com/how-to-test-json-properties-in-postman/ for the api
Create a POST api that will fetch the payload (list of items:[ ] ) to complete the requirement
a. FilterOut the Orders whose any OrderBlock’s LineNo is divisible by 3
b. Now store orderIDs in your postgres database , iteratively
Database - TestOrder
Table orders
Columns — id | orderID
(Make use of inbuilt functions for filtering out)
.

2. Excercise with the all array functions by taking array of your own choice (Remember the array should be taken as payload from postman)
.

3. Debug the code flow in the above given NodeJS application 

4. You are given with a array of objects (students). 
const students = [
{ name: "Alice", age: 20, grade: 75 },
{ name: "Bob", age: 22, grade: 85 },
{ name: "Charlie", age: 21, grade: 60 },
{ name: "David", age: 19, grade: 45 },
{ name: "Eve", age: 20, grade: 90 }
];
where each object represents a student with the following properties: name , age , and grade . Your task is to write NodeJS functions to perform
various operations on this array of students.
   1. Write a function filterPassedStudents(students) that takes an array of student objects as input and returns a new array containing only the students
who passed. Students who passed have a grade greater than or equal to 50.

   2. Write a function getStudentNames(students) that takes an array of student objects as input and returns an array containing only the names of the
students.

   3. Write a function sortStudentsByGrade(students) that takes an array of student objects as input and returns a new array containing the students
sorted by their grades in ascending order.

   4. Write a function getAverageAge(students) that takes an array of student objects as input and returns the average age of all the students.
Trainees are encouraged to use array functions for the purpose 


5. In the notes , it was prompted to firstly create table before running Create query , Is it possble to create a function that will check the existence of
table before adding any entity in the table. If the table does not exist , it should create one. Implement once to check.
