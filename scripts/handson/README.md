
# Cloudflare Image Upload cli for https://imagejam.net/step-2/connect

CLI script that uploads images to Cloudflare Images, for display in the <https://imagejam.net/step-2/connect> gallery.

## Installation

Requires NodeJS and NPM.

At the root of the repo:

```
npm install
```

## Usage

The cli requires the variable `CF_IMAGES_EVENT_KEY` to be set in the execution environment.

The value of this variable will provider by the workshop host during the session.

Set it in your environment like so (linux/mac):

```
export CF_IMAGES_EVENT_KEY=...
```

### Upload by URL

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
node scripts/handson/upload.js --url https://example.com/image.png [--id some-custom-image-id.png] [--metadata '{"tag": "connect"}']
```

### Upload local file

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
node scripts/handson/upload.js --file path/to/local/file.png [--id some-custom-image-id.png] [--metadata '{"tag": "connect"}']
```

## curl Equivalent

### Upload by URL

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
curl -X POST https://imagejam.net/connect-upload/ \
    -H "Authorization: Bearer $CF_IMAGES_EVENT_KEY" \
    --form 'url=https://example.com/image.png' \
    --form 'id=some-custom-image-id.png' \
    --form 'metadata={"tag":"connect"}'
```

### Upload local file

```sh
export CF_IMAGES_EVENT_KEY=... # only the first time
curl -X POST https://imagejam.net/connect-upload/ \
    -H "Authorization: Bearer $CF_IMAGES_EVENT_KEY" \
    --form 'file=@/path/to/local/file.png' \
    --form 'id=some-custom-image-id.png' \
    --form 'metadata={"tag":"connect"}'
```
