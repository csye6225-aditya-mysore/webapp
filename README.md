# webapp
1. Webapi and workflow.
  
2. Prerequisites: 
- Install Node, version 16.18.0
- Install PostgreSQL and run the postgresql server (port 5432)

3. Build process:
 - Unzip the file and go into the folder structure
 - First go to the path that contains package.json and run "npm install"
 - Then run "npm run server" to start server

4. Testing
 - Run "npm run unit-test" for unit tests
 - Run "npm run integration-test" for integration tests 

 5. Image creation 
 - Make a change and push to your forked repo
 - Create a PR from your forked repo feeature branch to org repo main branch
 - That should trigger packer-validate, pr-workflow, tests-worflow
 - If all of the pass, merge your changes, that should trigger your packer-build workflow which takes about 5-8 minutes to create an image 