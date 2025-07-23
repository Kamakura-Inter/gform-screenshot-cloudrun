const express = require("express");
const puppeteer = require("puppeteer");
const { google } = require("googleapis");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(express.json());

app.post("/", async (req, res) => {
  const formUrl = req.body.formUrl;
  if (!formUrl) return res.status(400).send("Missing formUrl");

  const browser = await puppeteer.launch({ headless: "new", args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(formUrl, { waitUntil: "networkidle0" });

  const questions = await page.$$('[role="listitem"]');
  const drive = google.drive({ version: "v3", auth: process.env.GOOGLE_API_KEY });

  const uploaded = [];

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    const filePath = `/tmp/q${i + 1}.png`;
    await q.screenshot({ path: filePath });

    const metadata = {
      name: `question_${i + 1}.png`,
      mimeType: "image/png",
    };
    const media = {
      mimeType: "image/png",
      body: require("fs").createReadStream(filePath),
    };

    const file = await drive.files.create({
      resource: metadata,
      media: media,
      fields: "id",
    });

    uploaded.push({ title: `Question ${i + 1}`, imageId: file.data.id });
  }

  await browser.close();
  res.json({ items: uploaded });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
