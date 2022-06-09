const OSS = require('ali-oss')

export function client(data) {
    //后端提供数据
    return new OSS({
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.secretAccessKey,
        stsToken: data.securityToken,
        region: "oss-cn-hangzhou", // oss地区
        bucket: "wxbpdapp-img-test"
    })
}