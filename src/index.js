// init project
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
const cors = require('cors');
const ytdl = require('ytdl-core');
var url = String(process.env.HOSTNAME).split("-");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// This route processes GET requests to "/"`
app.get("/", function(req, res) {
  res.send(
    '<h1>REST API</h1><p>A REST API starter using Express and body-parser.<br /><br />To test, curl the following and view the terminal logs:<br /><br /><i>curl -H "Content-Type: application/json" -X POST -d \'{"username":"test","data":"1234"}\' https://' +
      url[2] +
      ".sse.codesandbox.io/update<i></p>"
  );
  console.log("Received GET");
});



app.get('/api', async (req, res, next) => {
	try {
		var url = req.query.url;
		let title = 'audio';
		await ytdl.getBasicInfo(url, {
			format: 'mp4'
		}, (err, info) => {
			title = info.player_response.videoDetails.title;
		});

		res.header('Content-Disposition', `attachment; filename="${title}.mp3"`);
		ytdl(url, {
			format: 'mp3',
			filter: 'audioonly',
		}).pipe(res);
	} catch (err) {
		console.error(err);
	}
});

// Listen on port 8080
var listener = app.listen(8080, function() {
  console.log("Listening on port " + listener.address().port);
});
