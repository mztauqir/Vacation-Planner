"""  Mohammad Zaid Tauqir - PSID: 1900570
    Shivam Rana - PSID: 1912265
"""
import hashlib
import flask
from flask import jsonify
from flask import request, make_response
from sql import create_connection
from sql import execute_query


# setting up an application name
app = flask.Flask(__name__)  # sets up the application
app.config["DEBUG"] = True  # allow to show errors in browser

#creating connection to mysql database
conn = create_connection('test1.ccrpsin8ceyz.us-east-2.rds.amazonaws.com', 'admin', 'ww4c$Z^d{%M56>#Q', 'test1db')

# password 'password' hashed
masterPassword = "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"
masterUsername = 'SRZT'
validTokens = {
    "100", "200", "300", "400"
}
# we used a part of professor's code from security apis class - basic authentication
# basic http authentication, prompts username and password upon contacting the endpoint
# 'password' as plaintext should not be used to verify authorization to access. the password should be hashed and the hash should be compared to the stored password hash in the database
@app.route('/authenticatedroute', methods=['GET']) # endpoint at authenticate user : http://127.0.0.1:5000/authenticatedroute
def login_page():
    if request.authorization:
        encoded=request.authorization.password.encode() #unicode encoding
        hashedResult = hashlib.sha256(encoded) #hashing
        if request.authorization.username == masterUsername and hashedResult.hexdigest() == masterPassword:
            return '<h1> WE ARE ALLOWED TO BE HERE </h1>'
    return make_response('COULD NOT VERIFY!', 401, {'WWW-Authenticate' : 'Basic realm="Login Required"'})

@app.route('/api/trip/all', methods=['GET'])  # endpoint to get all the trips and destination: http://127.0.0.1:5000/api/trip/all
def trip_all(): # Defining the function
    cursor = conn.cursor(dictionary=True)
    show_trip = "select * from trip, destination where trip.destinationid = destination.id" #command to output the trip and destination table as one
    cursor.execute(show_trip) # This executes the command
    trips = cursor.fetchall() #This retrieves all the rows from trip/destination table
    return jsonify(trips) # returns the results in JSON format


@app.route('/api/trip', methods=['DELETE'])  # endpoint to delete row from the trip/destination table: http://127.0.0.1:5000/api/trip
def delete_animal(): # Defining the function
    request_data = request.get_json() # Requests the data in JSON format
    idToDelete = request_data['id'] # Requests users input for ID
    delete_statement1 = "DELETE FROM trip WHERE destinationid = %s" % (idToDelete)  # Takes the input for the destination ID to delete it from Trip table
    execute_query(conn, delete_statement1) # Executes the command in delete statement 1
    delete_statement2 = "DELETE FROM destination WHERE id = %s" % (idToDelete)  # Takes the input for the destination ID to delete it from destination table
    execute_query(conn, delete_statement2) # Executes the command in delete statement 2
    return 'Deleted Successfully' # Once all code runs it returns a successful message


@app.route('/api/trip', methods=['POST'])  # add animal as POST: http://127.0.0.1:5000/api/trip
def add_trip(): # Defining the function
    request_data = request.get_json() # Requests the data in JSON format
    destination_id = request_data['destinationid'] # Requests users input for destinationid
    transportation = request_data['transportation'] # Requests users input for transportation
    start_date = request_data['startdate'] # Requests users input for startdate
    end_date = request_data['enddate'] # Requests users input for enddate
    trip_name = request_data['tripname'] # Requests users input for tripname
    trip_query = "INSERT INTO trip (destinationid, transportation, startdate, enddate, tripname) VALUES ('%s', '%s','%s', '%s', '%s')" % (destination_id, transportation, start_date, end_date, trip_name)  # This takes the input from user and uses that to run the SQL command
    execute_query(conn, trip_query) # Executes the trip query

    country = request_data['country'] # Requests users input for country
    city = request_data['city'] # Requests users input for city
    sight_seeing = request_data['sightseeing'] # Requests users input for sightseeing
    dest_query = "INSERT INTO destination (id, country, city, sightseeing) VALUES ('%s', '%s', '%s', '%s')" % (destination_id, country, city, sight_seeing)  # This takes the input from user and uses that to run the SQL command
    execute_query(conn, dest_query) # Executes the dest query
    return 'Added Successfully'


@app.route('/api/destination/', methods=['PUT'])  # update vacation planner as PUT: http://127.0.0.1:5000/api/destination/?id=3
def destination_update(): # Defining the function
    if 'id' in request.args:  # only if an id is provided as an argument, proceed
        destination_id = int(request.args['id'])
    else:
        return 'ERROR: No ID provided!' # if No ID provided then it will present this message
    request_data = request.get_json() # Requests the data in JSON format
    u_country = request_data['country'] # Requests users input for country
    u_city = request_data['city'] # Requests users input for city
    u_sightseeing = request_data['sightseeing'] # Requests users input for sightseeing
    dest_id = destination_id # Requests users input for destinationid
    u_transportation = request_data['transportation'] # Requests users input for transportation
    u_startdate = request_data['startdate'] # Requests users input for startdate
    u_enddate = request_data['enddate'] # Requests users input for enddate
    u_tripname = request_data['tripname'] # Requests users input for tripname

    update_dest = "UPDATE destination SET country ='%s', city = '%s', sightseeing = '%s' WHERE id=%s" % (u_country, u_city, u_sightseeing, dest_id) # This takes the input from user and uses that to run the SQL command
    execute_query(conn, update_dest) # executing update destination

    update_trip = "UPDATE trip SET transportation ='%s', startdate = '%s', enddate = '%s', tripname = '%s'WHERE destinationid=%s" % (u_transportation, u_startdate, u_enddate, u_tripname, dest_id) # This takes the input from user and uses that to run the SQL command
    execute_query(conn, update_trip) # executing update trip
    return 'Updated Successfully' # Once every thing runs it prints successful message

app.run()

# For this Assignment we referenced crudops.py, restapi.py, securityapi.py all from black board and our homework 1 and homework 2
