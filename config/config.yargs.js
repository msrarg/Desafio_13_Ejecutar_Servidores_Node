const argv = require('yargs')
    .options({
        'p':{
            alias: 'port',
            demandOption: true,
            describe: 'Puerto a utilizar',
            type: 'number'
        },
        'm':{
            alias: 'modo',
            demandOption: true,
            describe: "Modo CLUSTER or FORK",
            type: 'string'
        }
    })
    .check((argv, options) => {
        if (isNaN(argv.p)){
            throw 'El puerto debe ser un número';
        }
        return true;
    })
    .argv;

module.exports = argv;