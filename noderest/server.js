const http =require('http');
const app = require('./app')
const User = require('./mongoDBInteraction/models/userSchema');
const md5 = require('md5');
const port  = process.env.PORT || 4000;

const server  = http.createServer(app);
// server.listen(port);  

server.listen(port, async function () {
    console.log(`server started at ${port}`);
    // open(URL);



    // res.send( "hello" );
    const username  =  'admin'
    const email     =  'admin@aetna.com'
    const userpassword  =  '123456'
    const role          =   'Admin'

    // const password = passwordHash.generate(userpassword);
    const password  =   md5(userpassword)

    // console.log(password); 


    try{
        const adminExist = await User.findOne({email:email});

        if(adminExist){

            // res.status(201).json({message:"Admin Account Already Existed",UserDetails : userExist,token:token});
            console.log("Admin Account Already Existed")

        }
        else{
             const user = new User({username,email,password,role});
            const userExist = await user.save();
            const token = await userExist.generateAuthToken();
            console.log("Admin Account Created")
            
            // res.status(201).json({message:"admin account created successfully"});
            
        }

           
        // }
    }catch(err){
        console.log(err);
    }
})

  

