module.exports = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'mongodb+srv://schavez:schavez@cluster0-wr9kp.mongodb.net/test?retryWrites=true',
    SECRET_TOKEN: 'miclavedetokens'
}