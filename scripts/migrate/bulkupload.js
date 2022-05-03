const fetch = require("node-fetch");
const FormData = require("form-data");
const pLimit = require("p-limit");

const { readLineAsync } = require("./utils");
const config = require("../../config");

async function bulkUpload() {

    const { CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY } = process.env;
    if (!CF_IMAGES_ACCOUNT_ID || !CF_IMAGES_API_KEY) {
        console.error("Please set both CF_IMAGES_ACCOUNT_ID and CF_IMAGES_API_KEY in the environment");
        process.exit(1);
    }

    const answer = await readLineAsync("Proceed with bulk upload to Cloudflare Images ? yes/[no]: ");
    if (answer !== "yes") {
        console.log("doing nothing");
        process.exit(0);
    }

    // max 10 simultaneous uploads
    const parallel_limit = pLimit(10);
    const promises = [];

    for (const key in config.gallery) {
        for (const image_name of config.gallery[key]) {
            promises.push(parallel_limit(() => (async function (image_name) {
                console.log(`Uploading to Cloudflare Images: ${image_name}`);

                // Upload image to Cloudflare Images
                // CF Images will download the image hosted at the provided URL and store it
                const body = new FormData();
                body.append("url", config.image_s3_baseurl + image_name);
                body.append("id", image_name);

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
                        console.log("Already exist: " + image_name);
                    }
                } catch (e) {
                    console.log("ERROR:" + e);
                }
            })(image_name)));
        }
    }

    await Promise.all(promises);
    console.log("Done.");
}

bulkUpload();

