const inputBody = {
    "reference": "Testing transaction",
    "subscriber": {
      "country": "UG",
      "currency": "UGX",
      "msisdn": "9999999999"
    },
    "transaction": {
      "amount": 1000,
      "country": "UG",
      "currency": "UGX",
      "id": "random-unique-id"
    }
  };
  const headers = {
    'Content-Type':'application/json',
    'Accept':'*/*',
    'X-Country':'UG',
    'X-Currency':'UGX',
    'Authorization':'Bearer UCcp1oe*******xCzki2w'
  };
  
  fetch('https://openapiuat.airtel.africa/merchant/v1/payments/',
  {
    method: 'POST',
    body: inputBody,
    headers: headers
  })
  .then(function(res) {
  return res.json();
  }).then(function(body) {
  console.log(body);
  });
  