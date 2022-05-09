const path = require("path");
const fs = require('fs')
const fetch = require("node-fetch");
const FormData = require("form-data");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const { exit } = require("../migrate/utils");

//
// Cloudflare Image Upload cli for https://imagejam.net/step-2/connect
//
// args:
//
// --url https://example.com/image.png OR --file path/to/local/file.png
// [--id somt/custom-image-id.png]
// [--metadata '{"some": "json object"}']
//

async function upload({ url, file, id, metadata }) {
    const { CF_IMAGES_EVENT_KEY } = process.env;
    if (!CF_IMAGES_EVENT_KEY) {
        exit("Please set CF_IMAGES_EVENT_KEY in the environment");
    }

    const body = new FormData();

    if (id) {
        body.append("id", id);
    }

    if (url) {
        body.append("url", url);
    }

    if (file) {
        try {
            const fileContent = fs.readFileSync(file);
            body.append("file", fileContent, path.basename(file));
        } catch(err) {
            exit("Error while reading file: " + file + "; " + err);
        }
    }

    if (metadata) {
        body.append("metadata", JSON.stringify(metadata));
    }

    try {
        console.log("\nUploading ...\n");

        const res = await fetch(
            `https://imagejam.net/connect-upload/`,
            {
                method: "POST",
                headers: { "Authorization": `Bearer ${CF_IMAGES_EVENT_KEY}` },
                body,
            }
        );

        if (res.status !== 200) {
            exit("HTTP " + res.status + " : " + await res.text());
        }

        console.log(await res.json());
    } catch (e) {
        exit("ERROR:" + e);
    }
}

function parseCommandLine() {
    const argv = yargs(hideBin(process.argv)).argv;
    if (!argv.url && !argv.file) {
        exit("Please provide one of `--url https://example.com/image.png` or `--file=/path/to/file.jpg` is required");
    }

    if (argv.url && argv.file) {
        exit("Cannot specify both `--url` and `--file` at the same time");
    }

    let file;
    if (argv.file) {
        const absFile = path.resolve(argv.file);
        try {
            if (!fs.existsSync(absFile) || !fs.lstatSync(absFile).isFile()) {
                exit("File does not exist or is not a valid file: " + absFile);
            }
        } catch (err) {
            exit(`Error while looking for file ${absFile}: ` + err.toString());
        }

        file = absFile;
    }

    let url;
    if (argv.url) {
        try {
            const parsedURL = new URL(argv.url);
            if (!["http:", "https:"].includes(parsedURL.protocol)) {
                exit(`Invalid url protocol ${parsedURL.protocol}`);
            }
            url = argv.url;
        } catch (err) {
            exit(`Invalid url ${argv.url}: ` + err.toString());
        }
    }

    let metadata;
    if (argv.metadata) {
        try {
            const parsedMetadata = JSON.parse(argv.metadata);
            if (typeof parsedMetadata !== "object") {
                exit("--metadata should be a valid JSON object");
            }

            metadata = parsedMetadata;
        } catch (e) {
            exit("Invalid JSON metadata: " + e.toString());
        }
    }

    return { url, file, id: argv.id, metadata };
}

upload(parseCommandLine());
