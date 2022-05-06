module.exports = {
    src_dir: "./src",
    dist_dir: "./dist",
    site_name: "Image Jam",
    site_url: "https://imagejam.net",

    // This is where your origin images are stored
    // We use this to get images during the migration
    image_origin_url: "https://imagejam.s3.amazonaws.com/",

    // This is the Images account Hash you'll find in your Cloudflare Images Dashboard
    // It is safe to disclose publicly, as this is not a secret value.
    cloudflare_images_account_hash: "-oMiRxTrr3JCvTMIzx4GvA",

    steps: [
        {
            name: "Step 1",
            path: "/step-1",
            description: "Serve unoptimized images without Cloudflare Images 🙈",
            image_url: function(image_name, variant, config) {
                return config.site_url + "/images/" + variant + "/" + image_name;
            }
        },
        {
            name: "Step 2",
            path: "/step-2",
            description: "Serve Cloudflare Images on default delivery domain",
            image_url: function(image_name, variant, config) {
                return "https://imagedelivery.net/" + config.cloudflare_images_account_hash + "/" + image_name + "/" + variant;
            }
        },
        {
            name: "Step 3",
            path: "/step-3",
            description: "Serve Cloudflare Images on a custom delivery domain",
            image_url: function(image_name, variant, config) {
                return config.site_url + "/cdn-cgi/imagedelivery/" + config.cloudflare_images_account_hash + "/" + image_name + "/" + variant;
            }
        },
        {
            name: "Step 4",
            path: "/step-4",
            description: "Serve Cloudflare Images without changing existing images URL",
            image_url: function(image_name, variant, config) {
                return config.site_url + "/images/" + variant + "/" + image_name + "?use_cf_images=1";
            }
        },
    ],

    gallery: {
        cakes: [
            "cakes/aditya-joshi--DUN-_bTO2Q-unsplash-ツ.jpg",
            "cakes/alexandra-khudyntseva-u95_MqFUaQg-unsplash-ツ.jpg",
            "cakes/aliet-kitchen-qrDbj7OV2EU-unsplash-ツ.jpg",
            "cakes/amirali-mirhashemian-cZFU60dKB6U-unsplash.jpg",
            "cakes/anansit-angsooksiri-d_QnWli2BA8-unsplash.jpg",
            "cakes/anirban-sengupta-GQvNc4bDRYw-unsplash.jpg",
            "cakes/bryam-blanco-nXKWLn8y9qE-unsplash.jpg",
            "cakes/david-holifield-ozpbV6uJp-o-unsplash.jpg",
            "cakes/elisabeth-joly-vinGM9Xe_sU-unsplash.jpg",
            "cakes/elle-inlom-6pytRvgJ4BY-unsplash.jpg",
            "cakes/gaby-dyson-QX814A1w3j4-unsplash.jpg",
            "cakes/massimo-adami-KXaQhW39xyc-unsplash.jpg",
            "cakes/sara-dubler-l-paVYNvewQ-unsplash.jpg",
            "cakes/sheri-silver-9IW9vsM0vz8-unsplash.jpg",
            "cakes/siami-tan-cMhAZqjfE2w-unsplash.jpg",
            "cakes/viktor-forgacs-51AhxwkYyHo-unsplash.jpg",
        ],
        candies: [
            "candies/alexander-schimmeck-02EFKK068T0-unsplash.jpg",
            "candies/amit-lahav-3t07n27XK-w-unsplash.jpg",
            "candies/amit-lahav-LU_fCezP9-o-unsplash.jpg",
            "candies/brooke-lark-uZjF45POZP4-unsplash.jpg",
            "candies/caspar-rae-OJ5daDcJuf4-unsplash.jpg",
            "candies/customerbox-aXq1oCCjlVM-unsplash.jpg",
            "candies/glen-carrie-tyL5dA1nYRU-unsplash.jpg",
            "candies/greyson-joralemon-9IBqihqhuHc-unsplash.jpg",
            "candies/gurble-tan-m1GT6GADQLA-unsplash.jpg",
            "candies/jacqueline-brandwayn-FYNs98upHrA-unsplash.jpg",
            "candies/jene-yeo-TktTsjgSrGY-unsplash.jpg",
            "candies/j-kelly-brito-WLo9PkfUwHA-unsplash.jpg",
            "candies/june-gathercole-j07KEb81xa4-unsplash.jpg",
            "candies/karsten-winegeart-iBv4UUvKlb4-unsplash.jpg",
            "candies/karsten-winegeart-PL5FZkW0Qkk-unsplash.jpg",
            "candies/larisa-birta-Y4XoECAaXLw-unsplash.jpg",
            "candies/mary-jane-duford-3NTHJMeG4p8-unsplash.jpg",
            "candies/nora-topicals-AFjGrDq9VkI-unsplash.jpg",
            "candies/sharon-mccutcheon-1wz7cN1XTmk-unsplash.jpg",
            "candies/sharon-mccutcheon-8XkNFQG_cgk-unsplash.jpg",
            "candies/taylor-rooney-dFC80hmTOoE-unsplash.jpg",
            "candies/towfiqu-barbhuiya-33taMhUiF0I-unsplash.jpg",
            "candies/towfiqu-barbhuiya-V4Kx2NoZ3dE-unsplash.jpg",
            "candies/ylanite-koppens-NCcWaZp75P8-unsplash.jpg",
        ],
        jam: [
            "jam/barbara-chowaniec-zG_Mm1XS25I-unsplash.jpg",
            "jam/calum-lewis-9RGPG_ksS3Q-unsplash.jpg",
            "jam/fernando-andrade-0ZGzu8J69kY-unsplash.jpg",
            "jam/frame-harirak-pESI75iiZd4-unsplash.jpg",
            "jam/jonathan-ocampo-NuZDBEeY2PQ-unsplash.jpg",
            "jam/jonathan-pielmayer-c69HK1HKHYs-unsplash.jpg",
            "jam/keri-titley-RHYap58QKq4-unsplash.jpg",
            "jam/lucinda-hershberger-4hQaZN5a1Xc-unsplash.jpg",
            "jam/malik-skydsgaard-imTYg9Kt6s0-unsplash.jpg",
            "jam/marian-hearne-I35_JP2Stwg-unsplash.jpg",
            "jam/maria-petersson-1l9Xl2B627g-unsplash.jpg",
            "jam/mateusz-feliksik-F8fIG15-Iew-unsplash.jpg",
            "jam/micheile-dot-com-SWyfzICySco-unsplash.jpg",
            "jam/monika-grabkowska-Bn4FIs250dY-unsplash.jpg",
            "jam/monika-grabkowska-QDlbyX2Ht24-unsplash.jpg",
            "jam/natural-chef-carolyn-nicholas-N16iTD8g2s0-unsplash.jpg",
            "jam/nicolas-flor-3PUMvqo2coA-unsplash.jpg",
            "jam/roberta-sorge-kp9UVn-PUac-unsplash.jpg",
            "jam/viktor-forgacs-5mGGOWD-Ths-unsplash.jpg",
            "jam/yulia-khlebnikova-o_O75f28GiA-unsplash.jpg",
        ]
    }
};