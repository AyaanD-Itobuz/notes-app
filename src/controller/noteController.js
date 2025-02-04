import notesSchema from "../models/notesSchema.js";
import multer from "multer";
import path from "path";

export const createNote = async (req, res) => {
  try {
    const userId = req.userId;
    // console.log(userId);

    const { title, content } = req.body;
    const existing = await notesSchema.findOne({ title: title, userId: req.userId })
    console.log(existing);
    //For existing user
    if (existing) {
      return res.status(400).json({
        success: false,
        message: "Title Already Exists",
      });
    }

    const data = await notesSchema.create({ title, content, userId: userId });

    if (data) {
      res.json({
        status: 201,
        data: content,
        message: "Note Created"
      });
    }
    else {
      res.json({
        status: 400,
        message: "data Not created"
      })
    }
  }

  catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Could not access",
    });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const data = await notesSchema.findByIdAndDelete(req.body._id);

    if (data) {
      res.json({
        status: 200,
        message: "Data Deleted Successfully"
      })
    }

    else {
      res.json({
        status: 400,
        message: "Data not Deleted"
      })
    }
  }
  catch (error) {
    res.json({
      status: 200,
      message: "Data Not Found",
      error : error.message
    })
  }
};

export const updateNote = async (req, res) => {
  try {
    const { _id } = req.body;
    const { title, content } = req.body;

    const data = await notesSchema.findByIdAndUpdate({ _id }, { title: title, content: content });

    if (data) {
      res.json({
        status: 200,
        message: "Data Updated"
      })
    }
    else {
      res.json({
        status: 400,
        message: "Data Not Updated"
      })
    }
  }
  catch (error) {
    res.json({
      status: 200,
      message: "Data not Found",
      error : error.message
    })
  }

};

export const getAllNote = async (req, res) => {
  try {
    // const {userId} = req.body;

    const data = await notesSchema.find({ userId: req.userId });

    if (data) {
      res.json({
        status: 200,
        data: data,
        message: "Data Fetched Successfully"
      })
    }
    else {
      res.json({
        status: 400,
        message: "Data Not Fetched"
      })
    }
  }
  catch (error) {
    res.json({
      status: 400,
      message: "Data Not Found",
      error : error.message
    })
  }
};

export const searchNote = async (req, res) => {
  try {
    const value = req.body.value;    
    const data = await notesSchema.find({ userId: req.userId ,  title: { $regex: value , $options: "i" }});

    if (data) {
      console.log(data);
      res.json({
        status: 200,
        data: data
      })
    }
    else {
      res.json({
        status: 200,
        message: "Data Not Found"
      })
    }
  }
  catch (error) {
    res.json({
      status: 400,
      message: "Error Occured : " + error
    })
  }
};

export const sortNote_title = async(req , res) => {
  try {
    const validSortFields = ["title" , "content" , "createdAt"];
    const validSortOrder = ["asc" , "desc"]

    const { sortField, sortOrder } = req.query;

    if (!validSortFields.includes(sortField)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid sort field"
        });
    }

    if (!validSortOrder.includes(sortOrder)) {
        return res.status(400).json({
            status: 400,
            message: "Invalid sort order"
        });
    }

    const sortCriteria = { [sortField]: sortOrder === 'asc' ? 1 : -1 };

    const sortedData = await notesSchema.find({userId : req.userId}).sort(sortCriteria);

    if (sortedData.length > 0) {
        return res.json({
            status: 200,
            data: sortedData,
            message: "Data Sorted"
        });
    } else {
        return res.json({
            status: 404,
            message: "No data found"
        });
    }
  }
  catch(error){
    res.json({
      status : 400,
      error : error.message,
      message : "Error occured"
    })
  }
};

export const paginationNote = async(req , res) => {
  try{
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;

    const offset = (page - 1) * limit;
    console.log(page, limit , offset);
    const data = await notesSchema.find({userId : req.userId})
    .sort({ createdAt : -1 })
    .skip(offset)
    .limit(limit)
    .exec();

    if(data)
    {
      res.json({
        status : 200,
        data,
        total : await notesSchema.find({userId : req.userId}).countDocuments()
      })
    }
  }
  catch(error)
  {
    res.json({
      status : 400,
      message : "Error Occured" + error
    })
  }
};

//File Upload 
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      
    );
  },
});

export const fileUpload = async (req, res) => {
  try {    
    const id = req.params.id;
    if (!req.file) {
      return res.status(400).send("No file uploaded.");
    }

    const data = await notesSchema.findOne({_id : id});

    if (data) {      
      data.file = "http://localhost:8000/" + req.file.path;
      await data.save();
      return res.status(200).json({
        success: true,
        message: `File uploaded successfully : ${req.file.filename}`,
      });

    } 
    else {
      return res.status(500).json({
        success: false,
        message: "Schema Not found",
      });
    }

  } catch (error) {
    res.json({
      status: 404,
      message: "Error while Uploading File",
      error: error.message,
    });
  }
};

export const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit  
});