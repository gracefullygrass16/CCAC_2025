from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["ccac"] 
co1 = db["peer"]
co2 = db["self"]  

data = {
    "self": [80, 70, 85, 90, 75], 
    "peer": [75, 65, 80, 85, 70],  
    "leader_types": {
        "Entrepreneurial": {"self": 85, "peer": 80},
        "Appreciative": {"self": 78, "peer": 74},
        "Ethical": {"self": 82, "peer": 79},
        "Adaptive": {"self": 88, "peer": 83}
    }
}

co2.insert_one(data)
print("Data inserted successfully!")