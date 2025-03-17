import multer from 'multer'


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")//all files will be stored in temp folder
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
    }
  })
  
export const upload = multer({ storage: storage })

//The file will stay here for only couple of minutes, because it will be deleted from the cloud in a function which we have done it by using FS.unlinkSync function.