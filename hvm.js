var argv = require('minimist')(process.argv.slice(2), opts={string: 'c'}),
    colors = require('colors'),
    fs = require('fs');

var current = fs.statSync('/etc/hosts').ino,
    path = '/etc/hvm/',
    profile = argv.c;

if (argv._.length === 0 && Object.keys(argv).length === 1) {

    console.log('Available profiles:\n');
    fs.readdirSync(path).map(function (profile) {
        if (current === fs.statSync(path  + profile).ino) {
            console.log('*', profile.green);
        } else {
            console.log(' ', profile);
        }
    })
}

if (argv._.length > 0) {

    if (fs.existsSync(path + argv._[0])) {
        fs.unlinkSync('/etc/hosts');
        fs.linkSync(path + argv._[0], '/etc/hosts');
        console.log('change hvm profile to', argv._[0]);
    } else {
        console.log('profile does not exist');
    }

}

if (argv.c && argv.c.length > 0) {

    if (fs.existsSync(path + profile)) {
        console.log('profile \'' + profile + '\' already exists');
    } else {
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        fs.createReadStream('/etc/hosts').pipe(fs.createWriteStream(path + profile));
        console.log('create new hvm profile called', profile);

        fs.unlinkSync('/etc/hosts');
        fs.linkSync(path + profile, '/etc/hosts');
        console.log('change hvm profile to', profile);
    }
}

if (argv.h) {
    console.log('hvm');
    console.log();
    console.log('  Switch between host entries');
    console.log();
    console.log('Usage:');
    console.log('  hvm            list all host entries');
    console.log('  hvm [name]     change hvm profile');
    console.log('  hvm -c [name]  create new hvm profile called name');
    console.log('  hvm -h         print manual');
    console.log();
}
