var config = {
    companyName: 'palm',
    projectName: 'palm'
}
module.exports = {
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'palm',
    port: 3306,
    companyName: config.companyName,
    projectName: config.projectName,
    templatePath: 'template/',
    baseJavaPath: 'target/' + config.projectName + '/src/main/java/com/'+config.companyName+'/',
    baseResourcesPath: 'target/' + config.projectName + '/src/main/resources/',
    baseWebAppPath: 'target/' + config.projectName + '/src/main/webapp/'
}