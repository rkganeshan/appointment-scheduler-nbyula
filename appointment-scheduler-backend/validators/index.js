const Joi=require("joi");

exports.userSignupValidator=(req,res,next)=>{
    const schema= Joi.object().keys({
        name:Joi.string().required(),
        email:Joi.string().required().regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/).message('Invalid Email'),
        password:Joi.string().required().min(6).message('Password must be 6 characters').regex(/\d/).message('Password must contain a number and length 6.')
    })
    const result=schema.validate(req.body)
    if(result.error)
    {
        if(result.error.details[0].type=="any.required")
        {
            return res.status(404).json({
                validationError:`${result.error.details[0].context.label} cannot be empty.`
            })
        }
        return res.status(404).json({
            validationError:result.error.details[0].message
        })
    }
    next();
}


exports.appointmentValidator=(req,res,next)=>{
    const schema= Joi.object().keys({
        title:Joi.string().required(),
        agenda:Joi.string().required(),
        time:Joi.string().required()
     })
    const result=schema.validate(req.body)
    if(result.error)
    {
        if(result.error.details[0].type=="any.required")
        {
            return res.status(404).json({
                validationError:`${result.error.details[0].context.label} cannot be empty.`
            })
        }
        return res.status(404).json({
            validationError:result.error.details[0].message
        })
    }
    next();
}