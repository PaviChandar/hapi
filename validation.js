import Joi from "joi"

export const registerValidation = (input) => {
    console.log("in register validation", input)

    const registerSchema = Joi.object(
        {
            firstname: Joi.string()
                .min(5)
                .required(),
            lastname: Joi.string()
                .min(5)
                .required(),
            email: Joi.string()
                .min(5)
                .required(),
            password: Joi.string()
                .min(5).
                required(),
        })
    return registerSchema.validate(input)
}

export const userValidation = (user) => {
    console.log("inside user validation")
    const usersSchema = Joi.object({
        username:Joi.string().min(5).required(),
        password:Joi.string().min(5).required()
    })
    return usersSchema.validate(user)
}

//  const loginSchema = Joi.object({
//     email: Joi.string()
//         .min(5)
//         .required(),
//     password: Joi.string()
//         .min(5).
//         required(),
// })
