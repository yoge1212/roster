import os
from flask import Flask, redirect, render_template, jsonify, request
from flask_cors import CORS
from flask_pymongo import PyMongo, MongoClient
from bson import ObjectId

app = Flask(__name__)




CORS(app) 


client = MongoClient(host='mongo', port=27017,
                     username=os.getenv("MONGO_USERNAME"), password=os.getenv("MONGO_PASSWORD"), authSource="admin")
db = client.test_mongodb
students_collection = db.students
@app.route('/')
def start():
	return "<p>test</p>"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001)  

         
@app.route('/addStudent', methods = ['POST'])
def add_Student():
    data = request.json
    print(f"Received data: {data}")
    mydict = { "firstName": data.get('firstname'), "lastName": data.get('lastname'), "major": data.get('major'), "yearOfGraduation": data.get('yearofgraduation') }
    insert = students_collection.insert_one(mydict)
    return jsonify({'message': 'Student added successfully', 'data': data}), 200
	

@app.route('/searchStudent', methods = ['POST'])
def search_Student():
     data = request.json
     search_query = data.get('search')
     print(f"recieved data: {search_query}")
     if search_query != "":
        cursor = students_collection.find({"firstName": {"$regex": search_query}})
        results = [serialize_document(doc) for doc in cursor]
     else:
        print("")
	
     print(f"Found results: {results}")
     return jsonify(results), 200


def serialize_document(doc):
    if '_id' in doc:
        doc['_id'] = str(doc['_id']) 
    return doc

@app.route('/stats', methods = ['POST'])
def get_stats():
     data = request.json
     search_major = data.get('major')
     search_gradYear = data.get('yearofgraduation')
     majorCount = students_collection.count_documents({ "major": search_major })
     gradYearCount = students_collection.count_documents({ "yearOfGraduation": search_gradYear })
     if search_major == '':
           majorCount = 0
           
     if search_gradYear == '':
           gradYearCount = 0
           
     print(gradYearCount)
     return jsonify({'major': majorCount, 'gradYear': gradYearCount})


@app.route('/removeStudent', methods = ['POST'])
def remove_student():
     data = request.json
     student_id = data.get('studentId')
     print(student_id)
     cursor =students_collection.delete_one({"_id": ObjectId(student_id)})
     return jsonify({'message': 'Student removed successfully', 'data': data}), 200
