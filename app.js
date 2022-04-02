const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()

const secretKey = `${process.env.SECRET_KEY}`


const stripe = require('stripe')(secretKey.toString())
app.use(express.json());
app.use(cors(['http://localhost:3000', 'https://localhost:3000']))


app.listen(3001, () => {
    console.log("Server is working!");
});


const booksRouter = require('./src/routers/booksRouter')
const genresRouter = require('./src/routers/genresRouter')
const favouritesRouter = require('./src/routers/favouritesRouter')


app.use('/api/' , booksRouter)
app.use('/api/' , genresRouter)
app.use('/api/' , favouritesRouter)


const calculateOrderAmounts = item => {
    return item.price * 100
}

app.get('/', (req, res) => {
    res.send('hello')
})

app.post('/create-payment-intent', async (req, res) => {
    try {
        const { item, user } = req.body

        const paymentIntent = await stripe.paymentIntents.create({
            amount: calculateOrderAmounts(item),
            currency: 'usd',
            metadata: {
                user_sub: user.sub,
                product_id: item.id
            }
        })

        res.send({
            clientSecret: paymentIntent.client_secret
        })
    } catch (error){
        console.log(error);
    }
})

