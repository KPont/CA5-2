/**
 * Created by Alex on 17-05-2015.
 */
/**
 * Created by Alex on 16-05-2015.
 */
var db = require('./db.js');

function _createUser(UserJson){
    var User = new db.User({'userName': UserJson.userName, 'password': UserJson.password, 'firstName': UserJson.firstName, 'lastName': UserJson.lastName,'email': UserJson.email, 'street': UserJson.street, 'city': UserJson.city, 'zip': UserJson.zip, 'country': UserJson.country, 'tickets': []});
    User.save(function(err){
        if(err) {
            return console.log(err);
        }
        else{
            console.log(User);
        }
    });
}

function _editUser(id, UserJson) {
    db.User.findByIdAndUpdate(id, {'userName': UserJson.userName, 'password': UserJson.password, 'firstName': UserJson.firstName, 'lastName': UserJson.lastName,'email': UserJson.email, 'street': UserJson.street, 'city': UserJson.city, 'zip': UserJson.zip, 'country': UserJson.country, 'tickets': UserJson.tickets});
}



function _createTicketAndAddToUser(ticketJson, userName){

    var ticket = new db.Ticket({'seat': ticketJson.seat, 'date': ticketJson.departure, 'arrival': ticketJson.arrival});
    ticket.save(function(err){
        if(err) {
            return console.log(err);
        }
        else{
            db.User.find({'userName': userName}, function(err, user){
                user[0].tickets.push(ticket.id);
                db.User.findByIdAndUpdate(user[0].id, {'userName': user[0].userName, 'password': user[0].password, 'firstName': user[0].firstName, 'lastName': user[0].lastName,'email': user[0].email, 'street': user[0].street, 'city': user[0].city, 'zip': user[0].zip, 'country': user[0].country, 'tickets': user[0].tickets});
            })
        }

    });
}

function _ja(){
    _createUser({userName: 'adlund', password: 'adlund', firstName: 'Alex', lastName: "lastAlex", email: 'adlund@hotmail.com', street: 'hvidovrevej', city: 'Hvidovre', zip: '2650', country: 'Denmark'});
    _createTicketAndAddToUser({seat: 'A88', date: '05-05-2015', departure: 'CPH', arrival: 'BAR'}, 'adlund' );
}


module.exports = {
    createUser : _createUser,
    editUser : _editUser,
    createTicketAndAddToUser: _createTicketAndAddToUser
    //uncomment for at kører ja function ved start. (til tests)
    //  ja: _ja()
};