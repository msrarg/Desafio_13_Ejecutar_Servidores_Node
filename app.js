const argv   = require('./config/config.yargs');
const Server = require('./models/server');

const server = new Server();

const puerto = argv.port ? argv.port : argv._.length > 0 ? argv._[0] : 8080
const modo = argv.modo || 'fork';

if (modo !== 'fork'){
    if (cluster.isPrimary) {
        console.log(`Proceso principal ID:(${process.pid})`)
        for(let i = 0; i <  core.cpus().length; i++) {
            cluster.fork();
        }
    
        cluster.on('exit', (worker) => {
            cluster.fork();
        });
    
    } else {
        server.listen(puerto);
    }
} else {
    server.listen(puerto);
}
