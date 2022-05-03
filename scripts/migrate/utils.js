const readline = require('readline');

const readLineAsync = function(message) {
    const rl = readline.createInterface(process.stdin, process.stdout);
    return new Promise((resolve, _) => {
        rl.question(message, (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};

module.exports = {
    readLineAsync,
};
