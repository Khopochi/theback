import axios from "axios";
import crypto from 'crypto'
import Orderid from "../models/Orderid.js";
import Ordersubmitted from "../models/Ordersubmitted.js"



//     "reference": "Testing transaction",
//     "subscriber": {
//       "country": "UG",
//       "currency": "UGX",
//       "msisdn": 999989584
//     },
//     "transaction": {
//       "amount": 1000,
//       "country": "UG",
//       "currency": "UGX",
//       "id": "random-unique-id"
//     }
// };
// const headers = {
// 'Content-Type':'application/json',
// 'Accept':'*/*',
// 'X-Country':'MW',
// 'X-Currency':'MWK',
// 'Authorization': 'Bearer  UCLcp1oeq44KPXr8X*******xCzki2w'
// };

const api_key = 'NTcyMzM1YTAtOGIzMC00YWVjLTlhYzktNjllMWYwMzc5NDMwOjRmNTNkZDc0LWI0MmItNGM2OC1hNjUwLTU0OWUyN2Y2MDA3YQ=='
const headers = {
  'content-type':'application/vnd.ni-identity.v1+json',
  'authorization': 'Basic '+api_key
  };


//posting payment & creating order
export const TransactionSTD = async (req,res) => {
  console.log(req.body.std)
    try{
        //posting payment
        const response = await axios.post('https://api-gateway.sandbox.standardbank.co.mw/identity/auth/access-token',{}, {headers})
        const token = response.data.access_token
        //creating order
          const orderHeader = {
            'authorization':'Bearer '+token,
            'content-type':'application/vnd.ni-payment.v2+json',
            'accept': 'application/vnd.ni-payment.v2+json'
          };

          const orderResponse = await axios.post('https://api-gateway.sandbox.standardbank.co.mw/transactions/outlets/c8937989-a7b5-4676-a50e-a5a824e77c7d/orders', req.body.std,{ headers: orderHeader })
          const newOrder = new Ordersubmitted({
            userid: req.body.userid,
            cart: req.body.cart,
            amount: req.body.total,
            status: req.body.status,
            orderid: orderResponse.data._id
          })
          const oderinfo = await newOrder.save()
          res.status(200).json({order:orderResponse.data, submitted:oderinfo})
    }catch(err){
        console.log(err)
        res.status(500).json({error: "Failed", err})
    }

    
}


//AIRTEL NOW
//generate random number


//check if number exist or not
// const checkAndAddToOrderIdDocument = async () => {
//   try {
//     let randomNumber;

//     do {
//       randomNumber = generateRandomNumber();
//       const existingOrder = await Orderid.findOne({ orderid: randomNumber });

//       if (!existingOrder) {
//         // OrderId doesn't exist, add it to the document
//         await Orderid.create({ orderId: randomNumber });
//         return randomNumber
//         break; // Exit the loop since we successfully added the order ID
//       } else {
//         // console.log(`Order ID ${randomNumber} already exists. Generating a new one.`);
//       }
//     } while (true);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// };

// export const TransactionAIRTEL = async (req,res) => {
//   const inputBody = {
//     "reference": "Payment",
//     "subscriber": {
//       "country": "MW",
//       "currency": "MWK",
//       "msisdn": "991281977"
//     },
//     "transaction": {
//       "amount": 10000,
//       "country": "MW",
//       "currency": "MWK",
//       "id": transid
//     }
//   };
//   //999989584
//     const inputBodyToken = {
//       "client_id": "c00ee051-fccc-4092-b48d-eb72ff46a561",
//       "client_secret": "8ea70e41-ebdb-48b8-9701-4a93394739e6",
//       "grant_type": "client_credentials"
//   };
//   const headersToken = {
//   'Content-Type':'application/json',
//   'Accept':'*/*'
//   };
//   try{
//     const token = await axios.post('https://openapi.airtel.africa/auth/oauth2/token', inputBodyToken,{headers: headersToken})
//     //now lest push payment
//     const headers = {
//       'Content-Type':'application/json',
//       'Accept':'*/*',
//       'X-Country':'MW',
//       'X-Currency':'MWK',
//       'Authorization': token.data.token_type+' '+token.data.access_token
//     };
//     const payment = await axios.post('https://openapi.airtel.africa/merchant/v1/payments/', inputBody,{headers:headers})
//     res.status(200).json(payment.data)
//   }catch(err){
//     res.status(200).json({error: "Failed", err})
//   }
// }



const generateRandomNumber = async () => {
  const minDigits = 8;
  const maxDigits = 15;
  const randomDigits = Math.floor(Math.random() * (maxDigits - minDigits + 1)) + minDigits;

  const randomNumber = Math.floor(Math.random() * Math.pow(10, randomDigits));
  const toadd = new Orderid({
    orderid: randomNumber
  });

  try {
    const existingOrder = await Orderid.findOne({ orderid: randomNumber });

    if (!existingOrder) {
      const myOrder = await toadd.save();
      return randomNumber;
    } else {
      // Recursively generate a new random number if it already exists
      return generateRandomNumber();
    }
  } catch (err) {
    // Handle errors if any (you might want to log or do something with the error)
    console.error('Error:', err);
    return randomNumber; // Return the last generated number in case of an error
  }
};

const checkAndAddToOrderIdDocument = async () => {
  try {
    let randomNumber;

    do {
      randomNumber = generateRandomNumber();
      const existingOrder = await Orderid.findOne({ orderId: randomNumber });

      if (!existingOrder) {
        // OrderId doesn't exist, add it to the document
        await Orderid.create({ orderId: randomNumber });
        return randomNumber; // Return the randomNumber and exit the loop
      } else {
        // Retry with a new random number
      }
    } while (true);
  } catch (error) {
    console.error('Error:', error);
    throw error; // Re-throw the error to be caught by the calling function
  }
};

export const TransactionAIRTEL = async (req, res) => {
  const newOrder = new Ordersubmitted({
            userid: req.body.userid,
            cart: req.body.cart,
            total: req.body.total,
            status: req.body.status
  })
  try {
    const transid = await generateRandomNumber(); // Assuming this line is needed here

    const inputBody = {
      "reference": "Payment",
      "subscriber": {
        "country": "MW",
        "currency": "MWK",
        "msisdn": req.body.phone,
      },
      "transaction": {
        "amount": req.body.total,
        "country": "MW",
        "currency": "MWK",
        "id": transid
      }
    };

    const inputBodyToken = {
      "client_id": "c00ee051-fccc-4092-b48d-eb72ff46a561",
      "client_secret": "8ea70e41-ebdb-48b8-9701-4a93394739e6",
      "grant_type": "client_credentials"
    };

    const headersToken = {
      'Content-Type': 'application/json',
      'Accept': '*/*'
    };

    const token = await axios.post('https://openapi.airtel.africa/auth/oauth2/token', inputBodyToken, { headers: headersToken });

    // Now let's push the payment
    const headers = {
      'Content-Type': 'application/json',
      'Accept': '*/*',
      'X-Country': 'MW',
      'X-Currency': 'MWK',
      'Authorization': token.data.token_type + ' ' + token.data.access_token
    };
    //post to order
    const newOrder = new Ordersubmitted({
      userid: req.body.userid,
      cart: req.body.cart,
      amount: req.body.total,
      status: req.body.status,
      orderid: transid
    })
    const oderinfo = await newOrder.save()
    const payment = await axios.post('https://openapi.airtel.africa/merchant/v1/payments/', inputBody, { headers: headers });

    res.status(200).json(payment.data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed', err });
  }
};



//CHECK BALANCE AIRTEL
export const checkBalanceAirtel = async (req,res) => {
  //ACCESS TOKEN HEADER
    const headersToken = {
      'Content-Type':'application/json',
      'Accept':'*/*'
    };
    //TOKEN BODY
    const inputBodyToken = {
      "client_id": "c00ee051-fccc-4092-b48d-eb72ff46a561",
      "client_secret": "8ea70e41-ebdb-48b8-9701-4a93394739e6",
      "grant_type": "client_credentials"
    };
  try{
      const token = await axios.post('https://openapi.airtel.africa/auth/oauth2/token', inputBodyToken,{headers: headersToken})
      //LETS GET BALANCE
      const headers = {
        'Accept':'*/*',
        'X-Country':'MW',
        'X-Currency':'MWK',
        'Authorization':  token.data.token_type+' '+token.data.access_token
      }
      const balance = await axios.get("https://openapi.airtel.africa/standard/v1/users/balance", {headers})
      res.status(200).json(balance.data)
  }catch(err){
    res.status(500).json({error: "Failed", err})
  }
}



