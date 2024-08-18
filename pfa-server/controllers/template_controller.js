const User = require('../models/User');
const Template = require('../models/Template');


exports.createTemplate = async(req , res)=>{
    const user = await User.findOne({token : req.body.token});

    if(user){
        const templateName = req.body.templateName;
        if(templateName && templateName != ""){
            const template = new Template({
                templateName : templateName,
                ownerId : user._id,
                isModified : false
            })

            await template.save();
            res.json({
                
                success : true,
                templateId : template._id,
            })
        }else{
            res.json({
                success : false,
                message : "Invalid Template"
            })
        }
    }else{
        res.json({
            success : false,
            message : "User not connected"
        })
    }
}

exports.modifyTemplate = async(req, res)=>{
    const token = req.body.token;
    const user = await User.findOne({token : token});

    if(user){
        const templateId = req.params.templateId;
        if(templateId){
            const template = await Template.findOne({_id : templateId});
            template.button.content = req.body.buttonContent;
            template.isModified = true;
            await template.save();

            res.json({
                success : true
            })

        }else{
            res.json({
                success : false,
                message : "Invalid Template"
            })
        }
    }else{
        res.json({
            success : false,
            message : "User not connected"
        })
    }
}

exports.getTemplate = async(req, res)=>{
    const templateId = req.params.templateId;
    if(templateId){
        const template = await Template.findOne({_id : templateId});
        if(template.isModified){
            res.json({
                success : true , 
                template : template
            });
        }else{
            res.json({
                success : false
            })
        }
    }else{
        res.json({
            success : false,
            message : "Invalid Template"
        })
    }
}