var gm = require('gm'),
    fs = require('fs'),
    request = require('request');

module.exports = {

    downloadFile: function (uri, fileName, done) {
        request.head(uri, function(err, res, body){
            request(uri).pipe(fs.createWriteStream(fileName)).on('close', done);
        });
    },

    resize: function (srcPath, dstPath, width, done) {
        gm(srcPath)
            .options({imageMagick: true})
            .resize(width)
            .write(dstPath, done);
    },

    process: function (uri, fileName, done) {
        var self = this;
        this.downloadFile(uri, fileName, function () {
            self.resize(fileName, fileName, 200, done);
        });
    }



};
