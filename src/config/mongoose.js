const config = require( "./index" );
const mongoose = require( "mongoose" );

module.exports = function( app ) {
    try {
        mongoose.connect( config.mongoUrl, { useUnifiedTopology: true, useNewUrlParser: true });
        mongoose.Promise = global.Promise;

        process.on( "SIGINT", cleanup );
        process.on( "SIGTERM", cleanup );
        process.on( "SIGHUP", cleanup );

        console.log("Mongoose connection  open")
        if ( app ) {
            app.set( "mongoose", mongoose );
        }
    } catch (error) {
        console.log(error)
    }
};

function cleanup( ) {
    mongoose.connection.close( function( ) {
        process.exit( 0 );
    } );
}
