import bcrypt from 'bcryptjs'
import User from '../../model/user.js'
import jwt from 'jsonwebtoken'

//register
export const registerUser = async (req,res)=>{
    const {username,email,password} = req.body
    try{
            const checkUser = await User.findOne({email})
            if(checkUser)
            
            return res.json({success:false,message:"User already exist with same email.Please try again"})
            
         const hashPassword = await bcrypt.hash(password,8)
         console.log(hashPassword)
         
         
         const user = new User({username,email,
            password:hashPassword})
         await user.save();
         res.status(200).json({success:true,
            message:'Registration was successfull'
         })
    }
    catch(e){
        res.status(500).json({success:false,
            message:'some error occured'
        })
    }
}





//login
export const loginUser = async (req,res)=>{

    try{
        const {email,password} = req.body
       const checkUser = await User.findOne({email})
        if(!checkUser)
            return res.json({success:false,message:"User doesn't exist. Please register fast!"})

        const check = await bcrypt.compare(password,checkUser.password)
        if(!check)
            return res.json({success:false,message:"Password is incorrect. Please try again!"})

        const token = jwt.sign({id:checkUser._id,email:checkUser.email,role:checkUser.role,username:checkUser.username},'CLIENT_SECRET_KEY',{expiresIn:'60m'})
        res.cookie('token',token,{httpOnly:true,secure:false}).json({success:true,
            message:'Logged in successfully',
            user:{
                id:checkUser._id,
                username:checkUser.username,
                email:checkUser.email,
                role:checkUser.role

            }
        })
        
    }
    catch(e){
        res.status(500).json({success:false,
            message:'some error occured'
        })
    }
}



//logout
export const logoutUser = (req,res)=>{
    res.clearCookie('token').json({success:true,
        message:"Logged out successfully"
    })
}


//auth middleware
export const authMiddleware =  async (req,res,next)=>{
    console.log("authmiddleware calling")
    const token = req.cookies.token
    console.log(token)
    if(!token) {return res.json({
        success:false,
        message : 'unauthorized user!'
    })}
    try {
        const decoded = jwt.verify(token,'CLIENT_SECRET_KEY')
        console.log(decoded)
        req.user = decoded;
        next()
    }
    catch(error){
        res.status(404).json({
            success:false,
            message:'Unauthrized user!'
        })
    }
}