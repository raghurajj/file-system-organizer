let fs = require("fs");
let path = require("path")

function organize(dirPath){
    if(dirPath == undefined)
    {
        destPath=process.cwd()
        return;
    }

    if(!fs.existsSync(dirPath))
    {
        console.log("Plz enter the correct directory path");
        return;
    }

    let destPath = path.join(dirPath,"organized_files");

    let folderNameHelper=1;
    while(fs.existsSync(destPath))
    {
        destPath = destPath + folderNameHelper;
        folderNameHelper= folderNameHelper+1;
    }

    fs.mkdirSync(destPath);

    organizeHelper(dirPath,destPath);

}


function organizeHelper(src,dest)
{
    let childFiles = fs.readdirSync(src);

    for(let i=0;i<childFiles.length; i++)
    {
        let childAddress = path.join(src,childFiles[i]);
        let isFile = fs.lstatSync(childAddress).isFile();
        if(isFile){
            let category = getCategory(childFiles[i]);
            sendFiles(childAddress, dest, category);
        }
    }

}

function sendFiles(srcFilePath, dest , category)
{
    let  categoryPath = path.join(dest,category);

    if(fs.existsSync(categoryPath) == false)
    {
        fs.mkdirSync(categoryPath);
    }

    let fileName = path.basename(srcFilePath);
    let destFilePath = path.join(categoryPath,fileName);
    
    fs.copyFileSync(srcFilePath,destFilePath);
    // fs.unlinkSync(srcFilePath)
    console.log(fileName, " copied to ",category);

}

function getCategory(file)
{
    let extension = path.extname(file);
    extension = extension.slice(1);
    for(let type in types)
    {
        let curTypeArray = types[type];
        for(let i=0;i<curTypeArray.length;i++)
        {
            if(extension == curTypeArray[i])
            {
                return type;
            }
        }
    }
    return "others";
}

module.exports = {
    organize:organize
}