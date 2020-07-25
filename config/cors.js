

// const whitelist = [
//     // config.appUrl,
//     "*",
//     "http://localhost:3000",
//     "localhost:3000",
//     "http://localhost:3001",
//     "localhost:3001"
// ];

// module.exports =  {
//     origin: function (origin, callback) {
//         console.log(origin)
//         if (whitelist.indexOf(origin) !== -1) {

//             callback(null, true);
           
//         } else {
//          console.log(origin)
//             callback(new Error("Not allowed by CORS"));

//         }
//     },
//     credentials: true,
// };