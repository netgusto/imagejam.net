
# Cloudflare Image Upload cli for https://imagejam.net/step-2/connect

CLI script that uploads images to Cloudflare Images, for display in the <https://imagejam.net/step-2/connect> gallery.

This tool uploads to the [Cloudflare Images API Image Upload endpoint](https://api.cloudflare.com/#cloudflare-images-upload-an-image-using-a-single-http-request)
via an endpoint proxy hosted on <https://imagejam.net/connect-upload/>.

To use this tool, you don't need a Cloudflare Images Account. The required key `CF_IMAGES_EVENT_KEY` will be provided by the workshop host during the session.

## Installation

Requires [NodeJS](https://nodejs.org/) 16.15 (LTS) or newest, with NPM.

At the root of the repo, run:

```
npm install
```

## Usage

The cli requires the variable `CF_IMAGES_EVENT_KEY` to be set in the execution environment.

The value of this variable will be provided by the workshop host during the session.

Set it in your environment like so (linux/mac):

```
export CF_IMAGES_EVENT_KEY=...
```

### Upload by URL

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
node scripts/handson/upload.js \
    --url https://example.com/image.png \
    --id some-custom-image-id.png \ # set your custom image ID; optional
    --metadata '{"tag": "connect"}' # optional
```

### Upload local file

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
node scripts/handson/upload.js \
    --file path/to/local/file.png \
    --id some-custom-image-id.png \ # set your custom image ID; optional
    --metadata '{"tag": "connect"}' # optional
```

## curl Equivalent

If you have `curl` on your setup and would like to use it instead of the provided node script, use these commands instead.

### Upload by URL

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
curl -X POST https://imagejam.net/connect-upload/ \
    -H "Authorization: Bearer $CF_IMAGES_EVENT_KEY" \
    --form 'url=https://example.com/image.png' \
    --form 'id=some-custom-image-id.png' \  # set your custom image ID; optional
    --form 'metadata={"tag":"connect"}'     # optional
```

### Upload local file

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
curl -X POST https://imagejam.net/connect-upload/ \
    -H "Authorization: Bearer $CF_IMAGES_EVENT_KEY" \
    --form 'file=@/path/to/local/file.png' \
    --form 'id=some-custom-image-id.png' \  # set your custom image ID; optional
    --form 'metadata={"tag":"connect"}'     # optional
```
