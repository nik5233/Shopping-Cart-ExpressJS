# NodeJS / Express / MongoDB - Build a Shopping Cart
Cloned from [MindSpace](https://www.youtube.com/playlist?list=PL55RiY5tL51rajp7Xr_zk-fCFtzdlGKUp) YouTube | [GitHub](https://github.com/mschwarzmueller/nodejs-shopping-cart-tutorial)

Modified [demo](https://shopping-cart-express.herokuapp.com/) on Heroku

## Build Setup
``` bash
# install dependencies
npm install

# serve at localhost:3000
npm start           # for heroku or something else 
npm run dev         # for development
npm run prod        # how app will work in production
npm run test        # for testing

# if list of product is empty change data base config
# in ./config/app.config.js['development'] on your and run this
npm run db
```

## Purchases
If you want see your purchases:

1. [Sign up](https://dashboard.stripe.com/register) in Stripe
2. Go to [API](https://dashboard.stripe.com/account/apikeys)
3. Copy ```Test Secret Key``` and change my key ```sk_test_Zob6eWLmep5SIgaJiij1W0SD``` on your in ```./routes/cart.js => ...router.post('/checkout'... => ...var stripe...``` 
4. Copy ```Test Publishable Key``` and change my key ```pk_test_uY85kjWpwPE3e1d8fM2Ki1TX``` on your in ```./public/javascripts/checkout.js => Stripe.setPublishableKey...```

After all changes make a [purchase](http://127.0.0.1:3000/shop/) and go to [Stripe dashboard](https://dashboard.stripe.com/test/dashboard). Here you can find all your purchases.