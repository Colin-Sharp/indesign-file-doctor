const path = require("path");

const fileExtLimiter = (allowExtArray) => {
    return (req, res, next) => {
        const files = req.files;

        const fileExtension = [];
        Object.keys(files).forEach(key => {
            fileExtension.push(path.extname(files[key].name))
        })

        const allow = fileExtension.every(ext => allowExtArray.includes(ext));

        if (!allow) {
            const message = `Error. Only ${allowExtArray.toString()} files allowed.`
            return res.status(422).json({status: "error", message})
        } 
            
        next();
    }
}

module.exports = fileExtLimiter;
