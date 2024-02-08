import { Server } from "socket.io";
import { config } from "dotenv";


config({ 
    path:"C:/Users/reach/Desktop/important/webrtc2/server/secrets/.env"
})


const io = new Server(process.env.PORT,{
    cors:true
})

io.on("connection",(socket)=>{ 
console.log(socket.id)
    socket.on("enter-room",({email,roomId})=>{ 
        io.to(roomId).emit("joined-room",{email,id:socket.id})
        socket.join(roomId)
    })
    socket.on('send-call',({to,offer})=>{
        console.log("SocketId:",socket.id,"remoteSocket:",to);
        io.to(to).emit("incoming-call",{from:socket.id,offer});
    })
    socket.on("call-accepted",({to,ans})=>{
        console.log("socketId",socket.id,"from",to);
        io.to(to).emit("ans-accepted",ans);
    })
})
