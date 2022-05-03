addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Route the image request either to the original image on S3
 * or to Cloudflare Images, depending on the value of "?use_cf_images" in the URL
 * @param {Request} request
 */

// This is the Images account Hash you'll find in your Cloudflare Images Dashboard
// It is safe to disclose publicly, as this is not a secret value.
const CLOUDFLARE_IMAGES_ACCOUNT_HASH = "-oMiRxTrr3JCvTMIzx4GvA";

async function handleRequest(request) {
  const url = new URL(request.url);

  if (!url.searchParams.has("use_cf_images")) {
    return notFound();
  }

  const use_cf_images = parseInt(url.searchParams.get("use_cf_images")) === 1;
  const { variant, imageName } = extractVariant(url);

  if (!variant || !imageName) {
    return notFound();
  }

  if (use_cf_images) {
    // Use Cloudflare Images to deliver image ✨
    return fetch("https://imagedelivery.net/" + CLOUDFLARE_IMAGES_ACCOUNT_HASH + "/" + imageName + "/" + variant);
  }

  // Don't use Cloudflare Images 🙈
  // corresponds to a website not (yet!) using Cloudflare Images
  return fetch("https://imagejam.s3.amazonaws.com/" + imageName); 
}

function extractVariant(url) {
  const parts = url.pathname.replace("/images/", "").split("/");
  const variant = parts.shift();
  return { variant: variant, imageName: parts.join("/") };
}

function notFound() {
  return new Response("Not found", { status: 404 });
}