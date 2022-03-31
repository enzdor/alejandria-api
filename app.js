const express = require('express')
const app = express();
const cors = require('cors')

const secretKey = `sk_test_51KcpwhEP3GAKC61y9b7GAKx2Z9e9A5X3VPzgJff55OnHz3Y3RCkRmgAjvfM2kbiw1hoIzJ9YJSYxWkU0jCNPx03c00MsxfisoG`

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

