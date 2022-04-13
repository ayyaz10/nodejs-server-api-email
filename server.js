const {
  v4: uuidv4
} = require('uuid');
const moment = require('moment');
const {google} = require('googleapis');
const knex = require('knex');
const express = require('express');
// var path = require("path");
const cors = require('cors');
const xlsx = require('xlsx');
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
// console.log(moment().format('D/M/YYYY'))
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '1231',
    database : 'emailapidb'
  }
});



// const db = knex ({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: {
//       rejectUnauthorized: false
//     }
//   }
// });




app.get('/', async function (req, res) {
 
  // Get metadata about apreadsheet
  // const metaData = await googleSheets.spreadsheets.get({
  //   auth,
  //   spreadsheetId
  // })


  // // Read rows from spreadsheet
  // const getRows = await googleSheets.spreadsheets.values.get({
  //   auth, 
  //   spreadsheetId,
  //   range: "Sheet1"
  // })

  // res.send(getRows.data);
})


// async function  getDbData() {
//   const userdata = await db.select("*").table('userdata');
//   addDbDataToExcel(userdata)
// }

function insertDB(name, mobile, email) {
  const result = db('userdata').insert({
    name,
    mobile,
    email,
    created: new Date()
  })
  .then(data => {
    // console.log(data)
    return {
      isInserted: true
    }
  })
  .catch(error => {
    return {
      isInserted: false,
      error
    }
  })
  return result;
}

app.post('/userdata', async function (req, res) {
  try {
    const { name, mobile, email } = req.body;
    await insertDB(name, mobile, email)
    .then(result => {
      if(result.isInserted) {
        res.status(200).send({
          isSuccess: true
        })
      }
    })
  } catch (error) {
    res.status(500).send({
      isSuccess: false,
      error
    })
  }
})


const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`listening to port ${PORT}`);
});

// CREATE TABLE userdata(
// 	id serial PRIMARY KEY, 
// 	name VARCHAR(100),
// 	address text,
// 	religion VARCHAR(100),
// 	mobile VARCHAR(100),
// 	email text,
// 	member VARCHAR(100),
// 	created TIMESTAMP
// )
