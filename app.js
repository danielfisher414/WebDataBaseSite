const express = require('express')
const app = express()
const port = 3000

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// const { ppid } = require('process');

const uri = 'mongodb+srv://danielf:12345@cluster0.g3jm3.mongodb.net/WebDataBase?retryWrites=true&w=majority';
// mongoose.connect('mongodb+srv://danielf:12345@cluster0.g3jm3.mongodb.net/WebDataCollection?retryWrites=true&w=majority');

const dbName = 'WebDataBase';

const client = new MongoClient(uri, {useNewUrlParser:true});

app.set('view engine', 'ejs');

app.get('/movies', (req,res)=>{
    const db = client.db(dbName);
    const collection = db.collection('WebDataCollection');

    collection.find({}).toArray(function(err,movie_list){
        assert.equal(err,null);
        res.render('movies',{'movies':movie_list})
    });

})

app.get('/', (req, res)=> res.send('hello world'))


client.connect(function(err){
    assert.equal(null,err);
    console.log("connected to mongo db");

    app.listen(port,() => console.log('listen on port 3000'))
});

// const moviesSchema = {
//     title: String,
//     genre: String,
//     year: String
// }

// const Movie = mongoose.model('Movie', moviesSchema);

// modula

// app.get('/', (req, res) => {
//     Movie.find({}, function(err, movies) {
//         res.render('index', {
//             moviesList: movies
//         })
//     })
// })

// app.listen(4000, function() {
//     console.log('server is running');
// })