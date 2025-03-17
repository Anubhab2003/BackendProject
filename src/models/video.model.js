import mongoose,{Schema} from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'


const videoSchema=new Schema({
    videoFile:{
        type:String,//cloudinaryUrl
        required:true
    },
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        trim:true,
    },
    videoUrl:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    disLikes:[
        {
            type:Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    comments:[
        {
            type:Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    channel:{
        type:Schema.Types.ObjectId,
        ref:"Channel"
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
},
{
    timestamps:true
})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model("Video",videoSchema)