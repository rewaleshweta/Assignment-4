const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())
// your code goes here

function opera() {
    let str = `
    message:${msg},
    status:${test},
    result:${ans}`
}


let ans, test, msg;
function abc(req, res, next) {
    let n1 = req.body.num1;
    let n2 = req.body.num2;
    if (n2 === 0 && req.url === "/divide") {
        msg = "cannot be divide by zero";
        test = "err";
        ans = "null";
    }
    else if (n1 === -1000000 || n2 === -1000000) {
        msg = "underflow"
        test = "err"
        ans = "null"
    } else if (n1 === 1000000 || n2 === 1000000) {
        msg = "overflow"
        test = "err"
        ans = "null"
    }
    else if (isNaN(n1) || isNaN(n2)) {
        msg = "invalid datatype"
        test = "err"
        ans = "null"
    }

    else {
        if (req.url == "/add") {
            ans = n1 + n2
            msg = "addition of 2 numbers"
            test = "success"
            if (ans > 1000000) {
                msg = "overflow"
                test = "err"
                ans = "null"
            }
            else if (ans < -1000000) {
                msg = "underflow"
                test = "err"
                ans = "null"
            }

        }

        if (req.url == "/sub") {
            ans = n1 - n2
            msg = "substraction of 2 numbers"
            test = "success"
            if (ans > 1000000) {
                msg = "overflow"
                test = "err"
                ans = "null"
            }
            else if (ans < -1000000) {
                msg = "underflow"
                test = "err"
                ans = "null"
            }
        }

        if (req.url == "/divide") {
            ans = n1 / n2
            msg = "division of 2 numbers"
            test = "success"
            if (ans > 1000000) {
                msg = "overflow"
                test = "err"
                ans = "null"
            }
            else if (ans < 1000000) {
                msg = "underflow"
                test = "err"
                ans = "null"
            }
        }

        if (req.url == "/mul") {
            ans = n1 * n2
            msg = "multiplication of 2 numbers"
            test = "success"
            if (ans > 1000000) {
                msg = "overflow"
                test = "err"
                ans = "null"
            }
            else if (ans < 1000000) {
                msg = "underflow"
                test = "err"
                ans = "null"
            }
        }

    }
    next();
}



function result() {

    let str = `{ message: ${msg},
        status: ${test},
   result: ${ans}}`
    return str
}



app.get("/", (req, res) => {
    res.send("Hello World")
})

app.post("/add", abc, (req, res) => {
    res.send(result())
})
app.post("/sub", abc, (req, res) => {
    res.send(result())
})
app.post("/mul", abc, (req, res) => {
    res.send(result())
})
app.post("/divide", abc, (req, res) => {
    res.send(result())
})


app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;