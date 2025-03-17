import bcrypt from 'bcrypt';

let password="Batman: I am Vengence"

const hashpass=async()=>{
    const hashed=await bcrypt.hash(password,1000000)
    console.log(hashed)
}
hashpass()