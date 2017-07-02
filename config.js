/**
Applications' configurations.
config.js
by: Joy Lucas
3/19/2017
*/


module.exports = {
    'secretKey': '12345-67890-09876-54321',
    
    //for local mongodb
  //  'mongoUrl' : 'mongodb://localhost:27017/webApp',
    
    //for IBM CLoudant NoSQL
   // 'uri': 'https://560c73e1-140f-4760-8aec-c20bc2ce143a-bluemix.cloudant.com/lutongbahaydb/_all_docs',
    
    //for mongoCluster
  //  'uri': 'mongodb://yojlucas:Myla12345@@lutongbahaycluster-shard-00-00-dnnpe.mongodb.net:27017,lutongbahaycluster-shard-00-01-dnnpe.mongodb.net:27017,lutongbahaycluster-shard-00-02-dnnpe.mongodb.net:27017/db?ssl=true&replicaSet=LutongBahayCluster-shard-0&authSource=admin',
   
    //for heroku
   'MONGODB_URI': 'mongodb://heroku_gbcj8ldc:inl65f07cqrvdlhupd56v6034q@ds145302.mlab.com:45302/heroku_gbcj8ldc',
    
    //'MONGOLAB_URI': 'mongodb://localhost/lutongbahay',
    
    
    'facebook': {
        clientID: '1849874211916661',
        clientSecret: '4cd3cf0a5b0826098fd1a77e0603e13a',
        callbackURL: 'https://localhost:3443/users/facebook/callback'
    }
}
