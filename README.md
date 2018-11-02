# TechnicalTest-Guelcom
My first contact with node.js, express, mongoDB for Guelcom

REST API DOCUMENTATION
----------------------
The API is stored in a Heroku server on the main uri: https://scary-vampire-95646.herokuapp.com/api/

The API has restringed access developed with access tokens, so first of all to use the API you should register as a user in the system.
To sign up you must do a post request to the relative uri /user/signup sending two params "username" in which you should specify an alias and "password" in which you spicify your key.
Once the sign up has been completed successfully you can log into the system in order to get a token, just make a get request to the relative uri /user/login, the system will send you the token in the http response.

Finally, to use the API you have to make sure that in every petition you send a request param called "secret-token" in which you must introduced your previous token value.

API USAGE
----------

GET: /companies
    Retrieve all companies stored on system

GET: /companies/:companyId
    Retrieve the company with _id property equals companyId

POST: /companies
    Create and Save a new company in DB

PUT: /companies/:companyId
    Update the company with _id property equals companyId (full properties)

PATCH: /companies/:companyId
    Update the company with _id property equals companyId (specific properties)

DELETE: /companies/:companyId
    Delete the company with _id property equals companyId. Returns a http 500 response if there was an error in the request or a 204 http response if the request was processed