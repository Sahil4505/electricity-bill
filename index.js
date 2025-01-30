const express=require("express");
const app=express();
const port=8080;
const path=require("path");
app.set("view engine","ejs");
app.set("views", path.join(__dirname,"/views"));

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.listen(port,()=>{
    console.log("Listening to port ",port);
});

app.get('/home',(req,resp)=>{
    resp.render("index.ejs");
});

function calculate(units){
    let arr=[];
    if(units<=50)
    {
        arr.push([units,3.5]);
    }
    else if(units<=150)
    {
        arr.push([50,3.5]);
        arr.push([units-50,4]);

    }
    else if(units<=250)
    {
        arr.push([50,3.5]);
        arr.push([100,4]);
        arr.push([units-150,5.2]);
    }
    else{
        arr.push([50,3.5]);
        arr.push([100,4]);
        arr.push([100,5.2]);
        arr.push([units-250,6.5]);
    }
    return arr;
}
app.post('/bill',(req,resp)=>{
    let {name,city,units}=req.body;
    let info=[name,city,units];
    let arr=calculate(units);
    // console.log(arr);
    resp.render("bill.ejs",{arr,info});
})