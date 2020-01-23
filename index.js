let express = require( 'express' );


let app = express();

let students = [{
    firstName : "Michael",
    lastName : "Angelus",
    id : 1730939
},
{
    firstName : "Daniel",
    lastName : "Di Vinere",
    id : 123456
},
{
    firstName : "Alfredo",
    lastName : "Salazar",
    id : 654321
},
{
    firstName : "Michael",
    lastName : "Roberts",
    id : 827365
}];

app.get( '/api/getAll', ( req, res ) => {
    return res.status( 200 ).json( students );
});

app.get( '/api/getById', ( req, res ) => {
    let id = req.query.id;

    let result = students.find( ( student ) => {
        if( student.id === Number(id)){
            return student;
        }
    });

    if( result ){
        return res.status( 200 ).json( result );
    }
    else{
        res.statusMessage = "The student id is not found in our list.";
        return res.status( 404 ).send(); 
    }

});

app.get( '/api/getByFirstName/:name', ( req, res ) => {
    
    let {name} = req.params;

    let results = students.filter( ( student ) => {
        if( student.firstName === name ){
            return student;
        }
    });

    if( results.length > 0 ){
        return res.status( 200 ).json( results );
    }
    else{
        res.statusMessage = "There is no student with that name.";
        return res.status( 404 ).send(); 
    }
});



app.listen( 8080, () => {
    console.log( "App running in port 8080");
});