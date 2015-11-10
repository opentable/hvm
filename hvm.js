#! /usr/bin/env node

var argv = require('minimist')(process.argv.slice(2), opts={string: 'c'}),
    colors = require('colors'),
    fs = require('fs');

var current = fs.statSync('/etc/hosts').ino,
    path = '/etc/hvm/',
    hostsPath = '/etc/hosts';

if (argv._.length === 0 && Object.keys(argv).length === 1) {

    listProfiles();

}

if (argv._.length > 0) {

    var profile = argv._[0];
    switchProfile(profile);

}

if (argv.c && argv.c.length > 0) {

    var profile = argv.c;
    createProfile(profile);

}

function listProfiles() {

    console.log('Available profiles:\n');
    fs.readdirSync(path).map(function (profile) {
        if (current === fs.statSync(path  + profile).ino) {
            console.log('*', profile.green);
        } else {
            console.log(' ', profile);
        }
    })

}

function switchProfile (profile) {

    if (fs.existsSync(path + profile)) {
        fs.unlinkSync(hostsPath);
        fs.linkSync(path + profile, hostsPath);
        console.log('change hvm profile to', profile);
    } else {
        console.log('profile does not exist');
    }

}

function createProfile (profile) {

    if (fs.existsSync(path + profile)) {
        console.log('profile \'' + profile + '\' already exists');
    } else {
        if (!fs.existsSync(path)) fs.mkdirSync(path);

        fs.createReadStream(hostsPath).pipe(fs.createWriteStream(path + profile));
        console.log('create new hvm profile called', profile);

        fs.unlinkSync(hostsPath);
        fs.linkSync(path + profile, hostsPath);
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
