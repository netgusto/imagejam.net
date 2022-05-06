const fetch = require("node-fetch");
const pLimit = require("p-limit");

const { readLineAsync, exit } = require("./utils");
const config = require("../../config");

async function reset() {
    const { CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY } = process.env;
    if (!CF_IMAGES_ACCOUNT_ID || !CF_IMAGES_API_KEY) {
        exit("Please set both CF_IMAGES_ACCOUNT_ID and CF_IMAGES_API_KEY in the environment");
    }

    const answer = await readLineAsync("⚠️⚠️⚠️ Warning ⚠️⚠️⚠️ - RESET will delete all Cloudflare Images for imagejam; confirm? yes/[no]: ");
    if (answer !== "yes") {
        exit("doing nothing");
    }

    // be nice, max 10 simultaneous deletes
    const parallel_limit = pLimit(10);
    const promises = [];

    for (const key in config.gallery) {
        for (const imageName of config.gallery[key]) {
            promises.push(parallel_limit(() => deleteImage(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY)));
        }
    }

    await Promise.all(promises);
    console.log("Done.");
}

async function deleteImage(imageName, CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY) {
    console.log(`Deleting Cloudflare Image: ${imageName}`);

    try {
        const res = await fetch(
            `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1/${imageName}`,
            {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${CF_IMAGES_API_KEY}` },
            }
        );

        if (res.status !== 200) {
            throw new Error(`${image_name}: HTTP ` + res.status + " : " + await res.text());
        }
    } catch (e) {
        console.log(e.toString());
    }
}

reset();

