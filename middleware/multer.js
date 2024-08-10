// const multer = require('multer')
// const upload = multer({ dest: 'temp/' })
// module.exports = upload

const multer = require('multer')
const memoryStorage = multer.memoryStorage() // 使用 MemoryStorage
const upload = multer({ storage: memoryStorage })

module.exports = upload
