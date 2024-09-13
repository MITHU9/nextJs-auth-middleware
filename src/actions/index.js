"use server";

import connectToDB from "@/database";
import User from "@/models";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function registerUserAction(formData) {
  await connectToDB();

  try {
    const { userName, email, password } = formData;

    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return {
        success: false,
        message: "Email already exists",
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({ userName, email, password: hashedPassword });
    const savedUser = await newUser.save();

    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: "Failed to save user",
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to register user",
    };
  }
}

export async function logInUserAction(formData) {
  await connectToDB();

  try {
    const { email, password } = formData;

    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcryptjs.compare(
      password,
      foundUser.password
    );

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Incorrect password",
      };
    }

    const createToken = {
      id: foundUser._id,
      email: foundUser.email,
      userName: foundUser.userName,
    };

    const token = jwt.sign(createToken, "DEFAULT_KEY", {
      expiresIn: "1d",
    });

    const getCookies = cookies();
    getCookies.set("token", token);

    return {
      success: true,
      message: "Logged in successfully",
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to login",
    };
  }
}

export async function fetchAuthUserAction() {
  await connectToDB();

  try {
    const getCookies = cookies();
    const token = getCookies.get("token")?.value || "";

    if (token === "") {
      return {
        success: false,
        message: "User not authenticated",
      };
    }

    const decodedToken = jwt.verify(token, "DEFAULT_KEY");

    const getUserinfo = await User.findOne({ _id: decodedToken.id });

    if (!getUserinfo) {
      return {
        success: false,
        message: "User not found",
      };
    }
    return {
      success: true,
      data: JSON.parse(JSON.stringify(getUserinfo)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "Failed to fetch auth user",
    };
  }
}

export async function logOutUserAction() {
  const getCookies = cookies();
  getCookies.set("token", "");
}
