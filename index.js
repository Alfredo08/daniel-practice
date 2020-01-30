let express = require( 'express' );
let bodyParser = require( 'body-parser' );
let jsonParser = bodyParser.json();

let app = express();

const students = [{
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

app.post( '/api/createStudent', jsonParser, ( req, res ) => {
    let {id, firstName, lastName} = req.body;

    let newStudent = {
        id : Number( id ),
        firstName,
        lastName
    };

    if( ! newStudent || ! firstName || ! lastName ){
        res.statusMessage = "You are missing a field in the body 'id, firstName, lastName";
        return res.status( 406 ).send();
    }
    else{
        
        let result = students.find( student => {
            if ( student.id === Number(id) ){
                return student;
            }
        });

        if( result ){
            res.statusMessage = "That id is already in our student list.";
            return res.status( 409 ).send();
        }
        else{
            students.push( newStudent );
            return res.status( 201 ).json( students[students.length - 1] );
        }
    }

    

});

app.put( '/api/updateStudent/:id', jsonParser, ( req, res ) => {
    let idParam = Number( req.params.id );
    let {firstName, lastName} = req.body;

    let currentObj = {firstName, lastName};

    if( !firstName && !lastName ){
        res.statusMessage = "You need to send at least either the 'firstName' or 'lastName'. ";
        return res.status(406).send();
    } 
    let theIndex;

    let result = students.find( ( student, index ) => {
        if ( student.id === idParam ){
            theIndex = index;
            return student;
        }
    });
    
    if( !result ){
        res.statusMessage = "Student not found.";
        return res.status(404).send();
    }

    for( let key in currentObj ){

        if( currentObj[ key ] !== undefined ){
            students[ theIndex ][ key ] = currentObj[ key ]; 
        }
    } 

    return res.status( 202 ).json( students[ theIndex ]);



})

app.listen( 8080, () => {
    console.log( "App running in port 8080");
});