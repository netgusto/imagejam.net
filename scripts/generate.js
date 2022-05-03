const path = require('path');
const glob = require("glob");
const fs = require("fs-extra");
const ejs = require("ejs");

const config = require("../config");

function stopIfError(err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
}

function generate(config, srcDir, destDir) {
    for (step of config.steps) {
        generate_step(config, srcDir, destDir, step);
    }
}

function generate_step(config, srcDir, destDir, stepConfig) {
    const stepDestDir = path.resolve(path.join(destDir, step.path));
    console.log("Generating Step '" + step.name + "' in " + stepDestDir);

    fs.removeSync(stepDestDir);
    fs.copySync(srcDir, stepDestDir, { overwrite: true }, stopIfError);
    glob.sync("**/*.html", { cwd: stepDestDir }).map(filename => {
        const absFile = path.join(stepDestDir, filename);
        ejs.renderFile(
            absFile,
            { ...config, step: stepConfig, pagePath: path.dirname(filename) },
            (err, str) => {
                stopIfError(err);
                fs.writeFileSync(absFile, str);
                console.log(`Rendered "${filename}"`);
            }
        );
    });
    fs.removeSync(path.resolve(path.join(stepDestDir, "_partials")));

    // Redirect / to /step-4/
    fs.writeFileSync(path.join(destDir, 'index.html'), '<html><meta http-equiv="Refresh" content="0; url=/step-4/" /></html>');
}

generate(config, path.resolve(config.src_dir), path.resolve(config.dist_dir));
