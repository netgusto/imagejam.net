addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Route the image request either to the original image on S3
 * or to Cloudflare Images, depending on the value of "?use_cf_images" in the URL
 * @param {Request} request
 */

const config = {
  // This is the Images account Hash you'll find in your Cloudflare Images Dashboard
  // It is safe to disclose publicly, as this is not a secret value.
  cloudflare_images_account_hash: "-oMiRxTrr3JCvTMIzx4GvA",
}

async function handleRequest(request) {
  const url = new URL(request.url);

  const { variant, imageName } = extractVariant(url);
  if (!variant || !imageName) {
    return notFound();
  }

  if (parseInt(url.searchParams.get("use_cf_images")) === 0) {
    // Don't use Cloudflare Images 🙈 and serve directly from S3.
    // Corresponds to a website not (yet!) using Cloudflare Images
    //
    // This is supported for illustrative purposes of the tutorial only,
    // as we need the worker to be able to deliver both original images for step 1,
    // and Cloudflare Images for step 4.
    // In a real setup, the worker would serve all traffic on Cloudflare Images,
    // so this whole condition block could be removed
    return fetch("https://imagejam.s3.amazonaws.com/" + imageName); 
  }

  // Use Cloudflare Images to deliver image ✨
  return fetch("https://imagedelivery.net/" + config.cloudflare_images_account_hash + "/" + imageName + "/" + variant);
}

function extractVariant(url) {
  const parts = url.pathname.replace("/images/", "").split("/");
  const variant = parts.shift();
  return { variant: variant, imageName: parts.join("/") };
}

function notFound() {
  return new Response("Not found", { status: 404 });
}