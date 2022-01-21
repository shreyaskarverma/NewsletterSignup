

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const client = require("@mailchimp/mailchimp_marketing");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

client.setConfig({
    apiKey: "76cc8d6e863ddd689370241c63456133-us20",
    server: "us20",
});

const PORT = process.env.PORT || 3000 ;

app.post("/", function (req, res) {
    /*console.log(req.body.first);
    console.log(req.body.last);
    console.log(req.body.mail);*/
    const run = async () => {
        const response = await client.lists.batchListMembers("186ea09b1b", {
            members: [{
                email_address: req.body.mail ,
                status: "subscribed",
                merge_fields: {
                    FNAME: req.body.first,
                    LNAME: req.body.last
                }
            }]
        });
        if(response.error_count === 0)
        res.redirect("/success.html");
        else
        res.redirect("/failure.html");
    };
    run();
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/f", function (req, res) {
    res.redirect("/");
});


app.listen(PORT, function () {
    console.log("Server is up and running at " + PORT + ".");
});






//AudienceID: 186ea09b1b
//APIKey: 76cc8d6e863ddd689370241c63456133-us20