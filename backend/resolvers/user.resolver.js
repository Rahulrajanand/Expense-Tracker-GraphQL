import {users} from "../dummyData/data.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
    Mutation: {

        signUp: async(_,{input},context) => {
            try {
                const {username, name, password, gender} = input;
                if(!username || !name || !password || !gender){
                    throw new Error("All fields are required");
                }
                const existingUser = await User.findOne({username});   //if User exists or not in database

                if (existingUser) {
                    throw new Error("User already exists");
                }

                const salt = await bcrypt.genSalt(10);                       //genSalt -> this is gonna generate a salt
                const hashedPassword = await bcrypt.hash(password, salt);   //hash(password, salt) - hash this password with salt

                // https://avatar-placeholder.iran.liara.run/
                const boyProfilePic =  `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfilePic =  `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password:hashedPassword,
                    gender,
                    profilePicture: gender === "male" ? boyProfilePic : girlProfilePic,
                })

                await newUser.save();
                await context.login(newUser)
                return newUser;
            
            } catch (err) {
                console.log("Error in signUp: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

// --------------*---------------*---------*----------------* --------------*---------------*---------*----------------*
        
        login: async(_,{input},context) => {
            try {
                const {username, password} = input;            // getting username,password from input
                const {user} = await context.authenticate("graphql-local",{username,password})

                await context.login(user);              //login the user and return the user back
                return user;
            } catch (err) {
                console.log("Error in login: ", err);
                throw new Error(err.message || "Internal server error");
            }
        },

// --------------*---------------*---------*----------------* --------------*---------------*---------*----------------*

        logout: async(_,_,context) => {
            try {
                await context.logout();
                req.session.destroy((err) => {
                    if(err) throw err;
                });
                res.clearCookie("connect.sid");
                
                return {message: "Logged out successfully"};
                
            } catch (err) {
                console.log("Error in logout: ", err);
                throw new Error(err.message || "Internal server error");
            }
        }
    },
    Query: {
        users: (_,_,{req,res}) => {
            return users
        },
        user: (_, {userId}) => {
            return users.find((user) => user._id === userId);
        }, 
    },
    
};

export default userResolver;