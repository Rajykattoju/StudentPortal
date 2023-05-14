# StudentPortal

This project is a simple and responsive student portal form that uses HTML, CSS, Bootstrap, JavaScript and JSONPOWERDB. The form allows students to enter their details like Name, Roll number, class, DOB, address and enrollment number. The form also has a change option for students who want to update their details for existing record. The form validates the user input and displays appropriate error messages if the input is invalid or the login credentials are incorrect. The form uses JSONPOWERDB as a local database to store and retrieve the user data. The form also has a stylish design that adapts to different screen sizes and devices.

## Why JSON POWER DB ?

As a developer who wants to create a fast, flexible, and user-friendly web application. We need a db to perform CRUD operations and don't want to deal with complex schemas, cumbersome queries, or slow performance that speaks language: JSON.

That's where json power db comes in. Json power db is a multi-mode database that lets you work with data in JSON format. JSON is a lightweight and human-readable data format that can represent any kind of information, from simple text to complex objects and arrays. JSON is also widely supported by most programming languages and web frameworks, making it easy to exchange data between different systems.

**With json power db, you can perform CRUD operations on your data using REST API calls. You can also use various modes of json power db, such as document DB, key-value DB, geo-spatial DB, and time series DB, depending on your needs. Json power db is built on top of PowerIndeX, a powerful and real-time data indexing engine that ensures high performance and scalability. Json power db is also schema-free, meaning you don't have to define the structure of your data beforehand. You can simply store and query your data as it is, without any restrictions or transformations.**

Json power db is the ultimate db for developers who want to work with JSON data. It is simple to use, nimble and in-memory, and offers many benefits over traditional databases. Json power db helps you save time, money, and effort in developing your web applications. Try it today and see the difference for yourself!

## Development Stack Used

- JavaScript
- Bootstrap5
- CSS
- JSON Power DB
- HTML

### Functionality

- **SAVE**: When student enters roll no., if that is not existed in database then we will allow to fill other details and save in database
- **CHANGE**: If student roll number already exists in database then student information is fetched from database and filled in respective feild then user can update student record in db
- **RESET**: The reset is used to clear the values in the feilds to continue with the further operations on page

### USAGE

Initially,

![image](https://github.com/Rajykattoju/StudentPortal/assets/34054117/e096f0b1-5550-45b6-8515-84af8fca9b76)

Lets **SAVE** the details of student, after entering the rollno it will enable other feilds depending on the rollno entered.
If the User clicks on SAVE button without filling the required details, it will prompt to fill details

The alerts on the input will be vanished once user enters the required input and shows the input box in green as successful input
![image](https://github.com/Rajykattoju/StudentPortal/assets/34054117/12206d35-a25f-4729-a8ac-6b499f9e51db)

click on SAVE button to save the details, an alert on top of the page displays whether the operation is success or failure.
And resets the page for contiuing with other operations
![image](https://github.com/Rajykattoju/StudentPortal/assets/34054117/75b055aa-e345-42c3-88e5-ca395044eaef)

If the operation fails, the alert will be red with appropriate msg
If the entered rollno exist in db, all the feilds are filled and user **CHANGE** the details and update by clicking on change button.
The **RESET** button is to reset all the feild to continue.

### Demo

https://github.com/Rajykattoju/StudentPortal/assets/34054117/03ca9d09-d80c-460f-be20-c752080ba716




### Sources
- Introduction to JsonPowerDB - V2.0 course on https://careers.login2explore.com/
- Bootstrap5 https://getbootstrap.com/docs/5.0/getting-started/introduction/
- For more information https://careers.login2explore.com





