# Simple Address Search
This utility provides a simple search functionality into an address book. It is designed for later integration with a 
database.

# Usage
Invoke the script with 

`node index.js John Jones`

Use the -h option to get a list of more advanced capabilities

_Note:_
The Resource file should be in the same directory as index.js
# Requirements
Nodejs must be installed in order to run this program

# Setup
Navigate to root of project 

`npm install`
This command also copies the sample-book.csv to the build directory

Install global dependencies for test and compilation<br>

`npm i -g ts-node mocha typescript`

# Build
`npm run build`
The typescript compiler outputs to the build directory.

# Test
`npm test`
Tests are written with mocha/chai in typescript.

# Linting
`npm run lint`
The tslint configuration can be found at the root of the project--tslint.json

# Project Structure
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

# User Stories
Are documented in the user-stories.md file located at the root of this project