import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

//Correct way to access JWT_SECRET
const JWT_SECRET = process.env.JWT_SECRET;

//login api
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await User.findOne({ email });
    if (!data) {
      return res.status(401).json({ message: "User not found" });
    } else {
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      } else {
        const token = jwt.sign(
          { email: data.email, id: data._id },
          JWT_SECRET,
          {
            expiresIn: "1h",
          }
        );
        res.json({ message: "Logged in successfully", token });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
//signup api

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    let data = await newUser.save();
    const token = jwt.sign({ email: data.email, id: data._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    //res.cookie("token", token, { httpOnly: true });
    res.status(201).json({ message: "User created successfully", data, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getuser = async (req, res) => {
  try {
    const data = await User.find();

    if (!data) {
      res.json("there is no any user");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getbyid = async (req, res) => {
  try {
    const data = await User.findById(req.params.id);
    if (!data) {
      res.status(404).json("user not found");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const updatebyid = async (req, res) => {
  try {
    const data = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!data) {
      res.status(404).json("user not found");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const deletebyid = async (req, res) => {
  try {
    const data = await User.findByIdAndDelete(req.params.id);
    if (!data) {
      res.status(404).json("user not found");
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
//auth midleware

export const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};
