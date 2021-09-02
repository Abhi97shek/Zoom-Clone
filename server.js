const express =require('express');
const PORT = process.env.PORT || 3030 ;
const app = express();


app.get('/',(req,res)=>{

    res.status(200).send("Hello World");
});




app.listen(PORT,()=>{

    console.log(`listing to the PORT ${PORT}`);
});