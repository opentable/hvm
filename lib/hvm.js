function Hvm () {

}

Hvm.prototype.createProfile = function (profile) {

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

};

Hvm.prototype.switchProfile = function (profile) {

    if (fs.existsSync(path + profile)) {
        fs.unlinkSync(hostsPath);
        fs.linkSync(path + profile, hostsPath);
        console.log('change hvm profile to', profile);
    } else {
        console.log('profile does not exist');
    }

};

Hvm.prototype.listProfile = function () {

    console.log('Available profiles:\n');
    fs.readdirSync(path).map(function (profile) {
        if (current === fs.statSync(path  + profile).ino) {
            console.log('*', profile.green);
        } else {
            console.log(' ', profile);
        }
    })

};
