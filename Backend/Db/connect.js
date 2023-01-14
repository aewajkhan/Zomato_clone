const {MongoClient} = require('mongodb');
const connectionString ="mongodb://localhost:27017";
const database= "Myrestarunts";
const Client= new MongoClient(connectionString,{
    useNewUrlParser:true,
    UseUnifiedTopology:true
});

let _db=null;

const dbObj={
    connect:function(callback){
        Client.connect(function(err,result){
            if(err){
                console.log(err);
            }
            _db=Client.db(database);  //use restuarants
            if(callback){
                return callback(err);
            }
        });
    },
    getDb:function(){
        return _db;

    }
};

module.exports=dbObj;