"use strict"
var fs = require('fs'),
    path = require("path"),
    nunjucks = require('nunjucks'),
    config = require('./config'),
    stat = fs.stat;
class Lang {

    wordConcat(word) {
        if (word.indexOf('_') == -1) {
            return word
        }
        var words = word.split('_')
        words = words.map(function (value, index) {
            if (index > 0) {
                return value.substring(0, 1).toUpperCase() + value.substr(1)
            } else {
                return value
            }
        })
        return words.join('')
    }

    firstWordToUpperCase(word) {
        if (!word || word.length == 0) {
            return ''
        }
        return word.substring(0, 1).toUpperCase() + word.substr(1)
    }

    getColumnType(name) {
        if (name.indexOf('varchar') == 0) {
            return 'String'
        } else if (name.indexOf('int') == 0) {
            return 'Integer'
        } else if (name.indexOf('bigint') == 0) {
            return 'Long'
        } else if (name.indexOf('float') == 0) {
            return 'Double'
        } else if (name.indexOf('date') == 0 ||name.indexOf('timestamp') == 0 || name.indexOf('datetime') == 0) {
            return 'Date'
        } else {
            return 'String'
        }
    }

    mkDirsSync(dirpath) {
        if (fs.existsSync(dirpath)) {
            return true;
        } else {
            this.mkDirsSync(path.dirname(dirpath));
            fs.mkdirSync(dirpath)
        }
    }
    copyFile(src, target, replace){
        if(replace){
            fs.writeFile(target, nunjucks.render(src, config))
        }else{
            var readable = fs.createReadStream(src);
            var writable = fs.createWriteStream(target);
            readable.pipe(writable);
        }
    }
    copyDir(src, dst, replace) {
        var self = this;
        fs.readdir(src, function (err, paths) {
            if (err) {
                throw err;
            }
            paths.forEach(function (path) {
                var _src = src + '/' + path,
                    _dst = dst + '/' + path;
                stat(_src, function (err, st) {
                    if (err) {
                        throw err;
                    }
                    if (st.isFile()) {
                        self.copyFile(_src, _dst, replace)
                    } else if (st.isDirectory()) {
                        self.mkDirsSync(_dst)
                        self.copyDir(_src, _dst, replace)
                    }
                });
            });
        })
    }
}
module.exports = new Lang()