# PGE Code Assessment

## Todo

- make private
- unit test
- containerized

## Advise:

This project was due in the mist of clossing my current contract and writting documentations. I push as far as I could while focusing on my current work force. Sorry for the delay.

- I didn't fully understand the requirements and I did not have access to the PO, thereofre, I push as best as I could.

## Process

- I created a restful api without Hapi and also one with Hapi, that follow basicly the same procedure. This is important for me because I a developer that can work with and without libraries.
- To make the project scalable, I used cluster.
- WEB_CONCURRENCY is for shared servers that do not use the computer cors
- I broke down the process using function modules.
  - Which includes a module to fetch bikes
  - and a module to create csv file.
  - and a module to send csv file to S3 Bucket.
- On the restful server, the csv file will be saved in data/csv/divvy_bikes.csv and remains there.
- on the serverless and hapi servers, the csv file will be pushed to s3 bucket. Check the environmental varaibles.

## Run Server

### Hapi Server

- npm run dev
- run on port 5060
- http://localhost:5060/api/bike-lambda

### RestFUL Server

- npm run dev
- run on port 5000
- localhost:5000/api/bikes/bike-lambda

### Serverless

- npm run dev
- https://kv4jfrzb4a.execute-api.us-east-1.amazonaws.com/dev/bikes

## Requirements

### Requirements Part I

- Pull data from this url: https://gbfs.divvybikes.com/gbfs/en/station_information.json (done)
- Make some changes to the output from the url above: (done)
- Remove rental_methods and rental_uris from the output. (done)
- Rename: external_id, station_id, and legacy_id into externalId, stationId, and legacyId. (done)
- Return the data when the capacity is less than 12. (done)
- Convert your JSON output into CSV. (done)
- Write your output into a filesystem as a .csv file. (done)
- Upload your file to S3. (overwrite or create a new file) (done)

### Requirements Part II

- Use Hapi (node framework).(done)
- Use async/await.(done)
- Add a unit-test for the API call.
- Use whatever node packages you like but don’t install a 3rd party databases,
  caching, or other server apps.(done)
- Optimize the app as best as possible for performance and assume your app will run
  in a multiprocessor or multicore environment.(done)
- Setup your app to run both locally and on AWS. This means that the Lambda created
  on AWS, will need to be somehow triggered when running your project locally. You
  may have to store the logic in your AWS Lambda in a local file so it can be triggered.
  You are free to use any means possible.(done)
- Provide the source code to your project through a file or code repository.(done)
- Please include a README in the project that has information on how to run your project and
  any additional details.(done)

### Requirements Part III

- API request would have an API token and handle the case where this is missing.
- Containerize your app so it can be deployed using Docker.
- Provide API gateway url to trigger your lambda.
