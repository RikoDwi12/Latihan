const express = require('express')
const app = express()
const port = 3030
const bodyParser = require('body-parser')
const db = require ('./konek')
const response = require('./response')


app.use(bodyParser.json())

app.get('/' , (req,res) => {
    const sql = "SELECT * FROM mahasiswa"
    db.query("SELECT * FROM mahasiswa" , (error, result) => {
        response(200 , result ,"get all data from mahasiswa", res)
    })
})

app.get('/GetMahasiswa',(req,res)=>{
    const sql = "SELECT * FROM mahasiswa"
    db.query(sql,(err,result)=>{
        res.status(200).json(result)
    })
})

app.post('/PostMahasiswa', (req,res)=>{
    const {id,nim,nama_lengkap,alamat} = req.body;
    const sql = "INSERT INTO mahasiswa(id,nim,nama_lengkap,alamat) VALUES(?,?,?,?)"
    db.query(sql, [id, nim, nama_lengkap, alamat],(err,result)=>{
        if(!err){
            res.status(200).json({
                message: "Success POST",
            })
        }else{
            res.status(500).json({message:err})
        }
    })
})

app.put('/PutMahasiswa/:id',(req,res)=>{
    const {nim,nama_lengkap,alamat} = req.body
    const { id } = req.params;
    const sql = "UPDATE mahasiswa SET nim=?, nama_lengkap=?, alamat=? WHERE id=?";
    db.query(sql, [nim, nama_lengkap, alamat,id], (err, result) => {
        res.status(200).json({
            message: "Success Update"
        })
    })
})

app.delete('/DeleteMahasiswa/:id',(req,res)=>{
    const { id } = req.params;
    const sql = "DELETE FROM mahasiswa WHERE id=?";
    db.query(sql, [id], (err, result) => {
        res.status(200).json({
            message: "Success DELETE"
        })
    })
})

app.get('/dataOrangtua' , (req, res) =>{
    const sql = "SELECT * FROM orang_tua"
    db.query("SELECT * FROM orang_tua" , (error,result) => {
        response(200 , result , "get all data from orang_tua" , res)
    })
})


app.get('/GetOrangtua' , (req , res) => {
    const sql = "SELECT * FROM orang_tua"
    db.query(sql,(err,result)=>{
        res.status(200).json(result)
    })
})

app.post('/PostOrangtua',(req,res)=>{
    const {nama_orangtua,alamat} = req.body;
    const sql = "INSERT INTO orang_tua(nama_orangtua,alamat) VALUES(?,?)"
    
    db.query(sql, [nama_orangtua,alamat],(err,result)=>{
        if (!err){
            res.status(200).json({
                message: "Succes POST",
            })

        }else{
            res.status(500).json({message:err})
        }
    })
})

app.put('/PutOrangtua/:id' , (req,res)=>{
    const {nama_orangtua,alamat} =req.body
    const {id} = req.params;
    const sql = "UPDATE orang_tua SET nama_orangtua=?, alamat=? WHERE id=?";
    db.query(sql, [nama_orangtua , alamat,id],(err,result) => {
        if(!err){
            res.status(200).json({
                message: "Success UPDATE",
            })
        }else{
            res.status(500).json({message:err})
        }
    })
})

app.delete('/DeleteOrangtua/:id', (req,res)=>{
    const {id} = req.params;
    const sql = "DELETE FROM orang_tua WHERE id=?";
    db.query(sql, [id] ,(err,result) => {
        res.status(200).json({
            message: "Success DELETE"
        })
    })
})

app.get('/GetMahasiswaOrangTua', (req, res) => {
    const sql = `
        SELECT mahasiswa.*, orang_tua.nama_orangtua
        FROM mahasiswa
        INNER JOIN orang_tua ON mahasiswa.id = orangtua.id
    `;

    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error" });
        } else {
            const mappedResult = result.map(row => ({
                mahasiswa_id: row.mahasiswa_id,
                nim: row.nim,
                nama_lengkap: row.nama_lengkap,
                alamat: row.alamat,
                nama_orang_tua: row.nama_orang_tua,
            }));

            res.status(200).json(mappedResult);
        }
    });
});



// app.get('/utama' , (req,res) => {
//     console.log({urlParam : req.query.nama});
//     res.send('Hello Utama')
// })

// app.get('/find' , (req,res) =>{
//     const sql = `SELECT nama_lengkap FROM mahasiswa WHERE nim = ${req.query.nim}`
//     db.query(sql, (error,result) =>{
//         response(200, result , "find mahasiswa name" , res)
//     }) 
// })

// app.get('/kota' , (req ,res) => {
//     const sql = `SELECT nama_lengkap FROM mahasiswa WHERE alamat = ${req.query.alamat}`
//     db.query(sql , (error,result) => {
//         response(250, result , "nama kotanya" , res)
//     })
// })

// app.post('/login' ,(req,res) => {
//     console.log({requestFromOutside: req.body})
//     co
//     res.send({
//         message : "success",
//         data : null,
//     })
// })

// app.put('/username' , (req,res) =>{
//     console.log({updateData : req.body});
//     res.send('update berhasil')
// })

app.listen(port, () =>{
    console.log(`Example app listen on port ${port}`);
})