import { makeSVGCard } from "../../components/image-generator";
import FormData from "form-data";


function makeHTMLPage(title, essay) {
  return `
  <!DOCTYPE HTML>
  <html>
  <head>
  <title>${title}</title>
  </head>
  <body>
    ${essay}
  </body>
  </html>
  `;
}

async function uploadToPinata(content, contentType) {
  let formData = new FormData();
  formData.append("pinataOptions", JSON.stringify({ cidVersion: 1 }));
  formData.append(
    "pinataMetadata",
    JSON.stringify({ keyvalues: { type: "essay" } })
  );
  
  // formData.append(new Blob([content], { type: contentType }));
  formData.append("file", Buffer.from(content, 'utf-8'), 'page.html');

  const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
    body: formData,
    method: "post",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_JWT_KEY}`,
    },
  });
  return await response.json();
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const { title, description, essay } = JSON.parse(req.body);

  const imageCID = await uploadToPinata(
    makeSVGCard(title, description),
    "image/svg+xml"
  );

  const essayHTML = makeHTMLPage(title, essay);
  console.log({essayHTML})
  const essayCID = await uploadToPinata(essayHTML, "text/html");

  res.status(200).send({imageCID, essayCID});

  // the rest of your code
}
