# Simple Address Search
This utility provides a simple search functionality into an address book. It is designed for later integration with a 
database.

#Usage
Invoke the script with 

`node index.js John Jones`

Use the -h option to get a list of more advanced capabilities

_Note:_
The Resource file should be in the same directory as index.js

#Setup
Navigate to root of project 

`npm install`

Install global dependencies for test and compilation<br>

`npm i ts-node mocha typescript`

#Build
`npm run build`

#Test
`npm test`

#Linting
`npm run lint`

#Project Structure
The source code lives in the ./src directory. The project is implemented in typescript and compiled to ES5 
for the nodejs runtime. Compiled files are output to the build directory

The main entry point for the application is index.ts. This file handles the argument parsing and hands it off
to the data layer for processing.

The data layer is designed to abstract the underlying implementation from the frontend CLI so that it can
be changed out easily in the future for a database. 

There are two components in the data layer:
1. db.ts
2. input-line.ts

"db" handles the searches and builds the backing in memory data from the input csv.
"input-line" represents a single line of input. Internally, it handles parsing this line of input into 
an address line.