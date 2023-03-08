import Hapi from "@hapi/hapi"
import jwt from "jsonwebtoken"
import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
import Joi from "joi"
import { registerValidation } from "./validation.js"
import User from "./model/user.js"


// const Hapi = require("@hapi/hapi")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const { mongoose } = require("mongoose")
// const Joi = require("@hapi/joi")
// const User = require("./model/user.js")
// require("dotenv").config();
// const Validation = require("./validation.js")
// const validationClass = new Validation()

const init = async () => {

    const server = Hapi.server({
        port: 5000,
        host: 'localhost'
    })

    try {
        await mongoose.connect('mongodb+srv://PavithraChandarS:Pavithra0501@cluster0.hzly1jq.mongodb.net/product?retryWrites=true&w=majority')
        console.log("Connected to mongodb")
    } catch (error) {
        console.log("Error : ", error)
    }
    mongoose.connection.on("disconnected", () => {
        console.log("mongodb disconnected")
    })

    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, h) {
                return "Hey, ready for authentication with HapiJS"
            }
        },
        {
            method: 'POST',
            path: '/register',
            handler: async function (request, h) {
                console.log("payload", request.payload)
                const registerError = registerValidation(request.payload)
                try {
                    if (registerError.error) {
                        console.log("inside register error if")
                        const errors = []
                        registerError.error.details.forEach(details => {
                            let error = { [details.path.toString()]: details.message }
                            errors.push(error)
                        })
                        throw errors
                    } else {
                        console.log("inside register try-else")
                        const newUser = new User({ ...request.payload })
                        await newUser.save()
                        return newUser
                    }

                } catch (error) {
                    console.log("Error : ", error)
                    return error
                }
            },
        },
        {
            method: 'POST',
            path: '/login',
            handler: async function (request, h) {
                const user = await User.findOne({ email: request.payload.email })
                if (!user)
                    return "User not found!"
                const isPasswordCorrect = await bcrypt.compare(request.payload.password, user.password)
                console.log("Payload password : ", request.payload.password)
                console.log("User password : ", user.password)
                if (!isPasswordCorrect)
                    return "Wrong Password or username!"

                try {
                    console.log("inside login try")
                    const token = jwt.sign({ _id: user._id, email: user.email, password: user.password }, process.env.JWT)
                    return token
                } catch (error) {
                    console.log("Error : ", error)
                }
            }
        }
    ])


    await server.start()
    console.log("Server is running  on port %s", server.info.uri)
}

init()