#!/usr/bin/env node

module.exports = function(context) {
    var fs = require('fs');
    var path = require('path');

    var pathsStr = context.opts.preferences['CLEANUP_PATHS'];
    if (pathsStr) {
        var paths = pathsStr.split(',').map(function(p) { return p.trim(); });
        paths.forEach(function(filePath) {
            var fullPath = path.join(context.opts.projectRoot, filePath);
            try {
                if (fs.existsSync(fullPath)) {
                    var stat = fs.statSync(fullPath);
                    if (stat.isDirectory()) {
                        // Delete directory recursively
                        if (fs.rmSync) {
                            fs.rmSync(fullPath, { recursive: true, force: true });
                        } else {
                            // Fallback for older Node versions
                            deleteFolderRecursive(fullPath);
                        }
                    } else {
                        fs.unlinkSync(fullPath);
                    }
                    console.log('Deleted: ' + fullPath);
                }
            } catch (e) {
                console.error('Error deleting ' + fullPath + ': ' + e.message);
            }
        });
    }
};

function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file) {
            var curPath = path + '/' + file;
            if (fs.statSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            } else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
}