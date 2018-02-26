####As a user, I want to be able to search my address book
The CLI provides a way to do a basic string matching search against the address book. 

**Acceptance Criteria** 
- The CLI provides a way to search the address book
- The search is not case sensitive
- The search returns only relevant results

####As a user, I want to be able to see the results of my search
The CLI returns search results in a meaningful human readable format

**Acceptance Criteria**
- The tool returns the records which match the query
- The tool returns the number of returned results

####As a user, I want to be able to search specific fields
The user should be able to specify only certain fields to be searched. This will prevent false positives 
for Jones if there are entries for people who live on Jones Street or in Jonesfield

**Acceptance Criteria**
- The CLI provides a way to specify which fields should be searched
- The search only returns matches against the specified fields

####As a user, I want to be able to search multiple fields
The user should be able to specify values for specific fields.

**Acceptance Criteria**
- The CLI provides a way to specify fields and values to be search in field:value format
- The matched results match all specified field value pairs

####As a user, I want to be able to see instructions on how to use the program 
The CLI should provides instruction on how to use itself in a complete and succinct fashion

**Acceptance Criteria**
- The CLI returns its instruction with the -h flag
- The instructions accurately detail the above functionality

####As a new developer, I want to have clear instructions on how to build the application
New developers to a project should have clear instructions on how to set up and run the project.

**Acceptance Criteria**
- The README file contains instructions on how to build the project
- The README contains instructions on how to run the project
- The README contains high level information about how the project is architected
- The code contains complete and accurate header and line level comments for every function

####As a developer, I want to define an interface which abstracts away the data layer
The data layer should provide an interface which masks the underlying implementation and will be suitable
for future work to add a database backing store

**Acceptance Criteria**
- The API of the db object will be usable in the future for searching into a database or elastic search 
instance
- The API of the db object provides no hint that it is backed by a csv file


