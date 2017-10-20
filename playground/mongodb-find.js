const {MongoClient, ObjectID} = require('mongodb');

let getDocs = (db) => {
	return new Promise( (resolve, reject) => {
		db.collection('Users').find().toArray().then( (docs) => {
			resolve(docs);
		}, (err) => {
			reject('Unable to fetch todos', err);
		});
	});
}

let main = () => {
	MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
		if (err) {
			return console.log('Unable to connect to MongoDB server');
		}
		console.log('mongofind: Connected to MongoDB server');

		// db.collection('Todos').find({
		// 	_id: new ObjectID('59dfe2ee934c9e473bce186b')
		// }).toArray().then( (docs) => {
		// 	console.log('Todos');
		// 	console.log(JSON.stringify(docs, undefined, 2));
		// }, (err) => {
		// 	console.log('Unable to fetch todos', err)
		// });

		db.collection('Users').find().toArray().then( (docs) => {
			//console.log(JSON.stringify(docs, undefined, 2));
			resolve(docs);
		}, (err) => {
			reject('Unable to fetch todos', err)
		});

		//db.close();
	});
};

module.exports = {
	getDocs
};