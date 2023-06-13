const fs = require("fs")
const CsvReader = require("csv-reader");
const { log } = require("console");
const { resolve } = require("path");
const { uploadIndustry } = require("../controller/industryController");
const IndustryModel = require("../model/industryModel");

function readFile() {

    let myfile = fs.createReadStream("C:\\Users\\JAHANVI\\OneDrive\\Desktop\\ROYAL\\MEAN\\seed\\ind_nifty50list.csv", "utf-8")

    myfile.pipe(new CsvReader({
        parseNumbers: true,
        parseBooleans: true,
        trim: true
    })).on('data', function (row) {
        console.log('A row arrived', row);
    }).on('end', function () {
        console.log('File read ended');
    })
}

// function insertJSONData(db) {
//     const collection = db.collection('');

//     collection.insertOne(jsonData, (err, result) => {
//       if (err) {
//         console.error('Error inserting document:', err);
//       } else {
//         console.log('Document inserted:', result.insertedId);
//       }

//       // Close the MongoDB connection when done
//       client.close();
//     });
//   }

module.exports.uploadIndustry = async function() {

    let industryArray = [];
    let myFile = fs.createReadStream("C:\\Users\\JAHANVI\\OneDrive\\Desktop\\ROYAL\\MEAN\\seed\\ind_nifty50list.csv", "utf-8")
    let myDataFromDb = [] 
    
    IndustryModel.find().then(data => {
        myDataFromDb = data
        console.log(" ==> ");
        console.log(myDataFromDb);
    })

    let promise = new Promise((resolve,reject) => {
        
        myFile.pipe(new CsvReader()).on('data',function(row){
    
            // let ind = row[1];
            // industryArray.push(ind)
    
            if(industryArray.indexOf(row[1].toLowerCase()) == -1){
                industryArray.push(row[1].toLowerCase)
            }
    
        }).on('end',function(end){
    
            console.log(industryArray);
            console.log("\n"+industryArray.length);
            // return industryArray;

            console.log("dbLength ",myDataFromDb.length);
            console.log("*******"+myDataFromDb)
            for(i = 0;i < myDataFromDb.length;i++){
                if(industryArray.indexOf(myDataFromDb[i].name.toLowerCase()) != -1){
                    delete industryArray[industryArray.indexOf(myDataFromDb[i].name)]
                }
            }

            let industryJson = []
            industryArray.forEach(item => industryJson.push({
                "name":item
            }))

            console.log(" =====> ");
            console.log(industryJson);

            resolve(industryArray)
        })
    
    })
    let data = await promise;
    console.log("THE END");
    return data;
}