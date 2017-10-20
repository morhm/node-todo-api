const {MongoClient, ObjectID} = require('mongodb');
const {getDocs} = require('./mongodb-find.js');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
	if (err) {
		return console.log('Unable to connect to MongoDB server');
	}
	console.log('mongodelete: Connected to MongoDB server');

	let deleteMany = (theText) => {
		db.collection('Todos').deleteMany({text: theText}).then( (result) => {
			console.log(result);
		});
	};

	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then( (result) => {
	// 	console.log(result);
	// });

	// findOneAndDelete
	// db.collection('Todos').findOneAndDelete({completed: false}).then( (result) => {
	// 	console.log(result);
	// });

	getDocs(db).then( (docs) => {
		let names = {};
		docs.forEach( (element) => {
			if (!names.hasOwnProperty(element.name)) {
				names[element.name] = 0;
			}
			names[element.name]++;
		});
		for (name in names) {
			if (names[name] > 1) {
				db.collection('Users').deleteMany({name: name}).then( (result) => {
					console.log('deleted names: ', name);
				});
			}
		}
	}).then( () => {
		db.collection('Users').findOneAndDelete({_id: ObjectID("59dfe3b8c308a548238e26b4")})
		  .then( (result) => {
		  	console.log('deleted a good one!');
		  })
	}).catch( (errorMessage) => {
		console.log(errorMessage);
	})
	//db.close();
});