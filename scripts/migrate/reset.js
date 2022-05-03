const fetch = require("node-fetch");
const pLimit = require("p-limit");

const { readLineAsync } = require("./utils");
const config = require("../../config");

async function reset() {
    const { CF_IMAGES_ACCOUNT_ID, CF_IMAGES_API_KEY } = process.env;
    if (!CF_IMAGES_ACCOUNT_ID || !CF_IMAGES_API_KEY) {
        console.error("Please set both CF_IMAGES_ACCOUNT_ID and CF_IMAGES_API_KEY in the environment");
        process.exit(1);
    }

    const answer = await readLineAsync("⚠️⚠️⚠️ Warning ⚠️⚠️⚠️ - RESET will delete all Cloudflare Images for imagejam; confirm? yes/[no]: ");
    if (answer !== "yes") {
        console.log("doing nothing");
        process.exit(0);
    }

    // max 10 simultaneous deletes
    const parallel_limit = pLimit(10);
    const promises = [];

    for (const key in config.gallery) {
        for (const image_name of config.gallery[key]) {
            promises.push(parallel_limit(() => (async function (image_name) {
                console.log(`Deleting Cloudflare Image: ${image_name}`);

                try {
                    const res = await fetch(
                        `https://api.cloudflare.com/client/v4/accounts/${CF_IMAGES_ACCOUNT_ID}/images/v1/${image_name}`,
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
            })(image_name)));
        }
    }

    await Promise.all(promises);
    console.log("Done.");
}

reset();

