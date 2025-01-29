import notesSchema from "../models/notesSchema.js";
import jwt from "jsonwebtoken"


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
      message: "Data Not Found"
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
      message: "Data not Found"
    })
  }

}

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
      message: "Data Not Found"
    })
  }
}

export const searchNote = async (req, res) => {
  try {
    const value = req.body.value;

    const data = await notesSchema.find({ title: { $regex: value } } && { userId: req.userId });

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

}