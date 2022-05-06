const fetch = require("node-fetch");
const FormData = require("form-data");
const pLimit = require("p-limit");

const { readLineAsync, exit } = require("./utils");
const config = require("../../config");

async function bulkUpload() {

    const { CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY } = process.env;
    if (!CF_IMAGES_ACCOUNT_ID || !CF_IMAGES_API_KEY) {
        exit("Please set both CF_IMAGES_ACCOUNT_ID and CF_IMAGES_API_KEY in the environment");
    }

    const answer = await readLineAsync("Proceed with bulk upload to Cloudflare Images ? yes/[no]: ");
    if (answer !== "yes") {
        exit("doing nothing");
    }

    // be nice, max 10 simultaneous uploads
    const parallel_limit = pLimit(10);
    const promises = [];

    for (const key in config.gallery) {
        for (const imageName of config.gallery[key]) {
            promises.push(parallel_limit(() => upload(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY)));
        }
    }

    await Promise.all(promises);
    console.log("Done.");
}

async function upload(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY) {
    // Upload image to Cloudflare Images
    // CF Images will download the image hosted at the provided URL and store it
    // Leverages Upload by URL and Custom ID features of Cloudflare Images
    // see https://developers.cloudflare.com/images/cloudflare-images/upload-images/custom-id/

    console.log(`Uploading to Cloudflare Images: ${imageName}`);

    const body = new FormData();
    body.append("url", config.image_origin_url + imageName); // tell CF Images to fetch this URL for us
    body.append("id", imageName); // tell CF Images that we want our image to have this ID (ie, its current name)

    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1`,
            {
                method: "POST",
                headers: { "Authorization": `Bearer ${CF_IMAGES_API_KEY}` },
                body,
            }
        );

        if (res.status !== 200 && res.status !== 409) {
            throw new Error("HTTP " + res.status + " : " + await res.text());
        }

        if (res.status === 409) {
            // 409: image already exists, it must have been imported by a previous run
            console.log("Already exist: " + imageName);
        }
    } catch (e) {
        console.log("ERROR:" + e);
    }
}

bulkUpload();

