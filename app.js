import express from "express";
import bodyParser from "body-parser";

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());

app.get("/api/test-sse", async (req, res) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  
  let counter = 0;
  let interValID = setInterval(() => {
    counter++;
    res.write(`data: ${JSON.stringify({ num: counter })}\n\n`); 
  }, 1000);

  res.on("close", () => {
    console.log("client dropped me");
    clearInterval(interValID);
    res.end();
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
