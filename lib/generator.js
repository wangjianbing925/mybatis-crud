"use strict"
var config = require('./config')
var query = require('./mysql')
var lang = require('./lang')
var nunjucks = require('nunjucks')
var fs = require('fs');

class Generator  {
    init(){
        var self = this;
        self.initDirectory()
        query("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '"+config.database+"'", function (err, vals) {
            vals.forEach(function (val) {
                if(val.TABLE_NAME.toUpperCase() === 'CONNECT_TEST'){
                    return
                }
                self.initCode(val.TABLE_NAME.toLowerCase())
            })
        })
    }
    initDirectory(){
        lang.mkDirsSync(config.baseJavaPath)
        lang.mkDirsSync(config.baseResourcesPath)
        lang.mkDirsSync(config.baseWebAppPath)
        lang.copyFile(config.templatePath+'pom.xml', 'target/' + config.projectName + '/pom.xml', true)
        lang.copyDir(config.templatePath+'common/java', config.baseJavaPath, true)
        lang.copyDir(config.templatePath+'common/resources', config.baseResourcesPath, true)
        lang.copyDir(config.templatePath+'common/webapp', config.baseWebAppPath)
    }
    initCode(tableName){
        var self = this;
        query("show columns from " + tableName,function(err,vals){
            var columns = [], hasPriKey = false;
            vals.forEach(function (column) {
                column.Field = column.Field.toLowerCase()
                if(column.Key === 'PRI'){
                    hasPriKey = true
                }
                columns.push({
                    field: column.Field,
                    name: lang.wordConcat(column.Field),
                    variableName: lang.firstWordToUpperCase(lang.wordConcat(column.Field)),
                    type: lang.getColumnType(column.Type),
                    isPri: column.Key === 'PRI'
                })
            })
            var data = {
                hasPriKey: hasPriKey,
                tableName: tableName,
                className: lang.firstWordToUpperCase(lang.wordConcat(tableName)),
                variableName: lang.wordConcat(tableName),
                companyName: config.companyName,
                columns: columns,
                serialVersionUID: new Date().getTime()
            }
            self.createDomain(data)
            self.createMybatisXml(data)
            self.createService(data)
            self.createController(data)
        })
    }
    createDomain(data){
        var res = nunjucks.render(config.templatePath + 'Bean.java', { data: data})
        var disPath = config.baseJavaPath + '/persistence/bean/';
        lang.mkDirsSync(disPath)
        fs.writeFile(disPath + data.className+'.java', res)
        var res = nunjucks.render(config.templatePath + 'Mapper.java', { data: data})
        var disPath = config.baseJavaPath + '/persistence/mapper/';
        lang.mkDirsSync(disPath)
        fs.writeFile(disPath + data.className+'Mapper.java', res)
    }
    createMybatisXml(data){
        var res = nunjucks.render(config.templatePath+'mapper.xml', { data: data})
        var disPath = config.baseResourcesPath + 'mappers/';
        lang.mkDirsSync(disPath)
        fs.writeFile(disPath + data.className+'Mapper.xml', res)
    }
    createService(data){
        var disPath = config.baseJavaPath + '/service/';
        lang.mkDirsSync(disPath)
        var res = nunjucks.render(config.templatePath+'/Service.java', { data: data})
        fs.writeFile(disPath + data.className+'Service.java', res)
        lang.mkDirsSync(disPath+'/impl/')
        var res = nunjucks.render(config.templatePath+'/ServiceImpl.java', { data: data})
        fs.writeFile(disPath + '/impl/' + data.className+'ServiceImpl.java', res)
    }
    createController(data){
        var disPath = config.baseJavaPath + '/api/bg/';
        lang.mkDirsSync(disPath)
        var res = nunjucks.render(config.templatePath+'/Controller.java', { data: data})
        fs.writeFile(disPath + data.className+'Controller.java', res)
    }
}
module.exports = new Generator()