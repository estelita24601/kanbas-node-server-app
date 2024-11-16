// the `app` parameter is an instance of express
export default function Hello(app){
    // if url = localhost:4000/hello then send a response
    app.get('/hello', (request, response) => {response.send('Life is good!')})

    // if url = localhost:4000/ then send a response
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')})
    }
