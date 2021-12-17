import Product from '../models/product';
import formidable from 'formidable';
import fs from 'fs';
import _ from 'lodash';
import { response } from 'express';

export const create = (req, res) => {
    // console.log(req.body)
    const product = new Product(req.body)
    product.save((err, product) => {
        if (err) {
            return res.status(400).json({
                err: "Không thêm được sản phẩm"
            })
        }
        res.json(product)
    })
}
export const productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
        if(err || !product){
            res.status(400).json({
                error:"Không tìm thấy sản phẩm"
            })
        }
        req.product = product;
        next();
    })
}

export const read =(req,res)=>{
    return res.json(req.product);
}

export const remove = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if(err) {
            return res.status(400).json({
                error: "Không xóa được sản phẩm"
            })
        }
        res.json({
            deletedProduct,
            message: "Sản phẩm đã được xóa thành công"
        })
    })
}
export const list = (req, res) => {
    Product.find((err, data) => {
        if (err) {
            message: "Không tìm thấy sản phẩm"
        }
        res.json( data )
    })
}
// export const update = (req,res) =>{  
//     let form = new formidable.IncomingForm();
   
//     form.keepExtensions = true;
//     form.parse(req, (err, fields, files) => {      
//         if (err) {
//             res.status(400).json({
//                 error: "Sửa sản phẩm không thành công!"
//             })
//         }
//         const { name, describe, price} = fields;
//         if (!name || !describe || !price ) {
//             res.status(400).json({
//                 error: "Bạn cần nhập đầy đủ thông tin "
//             })
//         }

//         // let product = new Product(fields);
//         let product = req.product;
//         product = _.assignIn(product,fields);

//         if (files.photo) {
//             if (files.photo.size > 1000000) {
//                 res.status(400).json({
//                     error: "Bạn nên upload ảnh dưới 10mb"
//                 })
//             }
//             product.photo.data = fs.readFileSync(files.photo.path);
//             product.photo.contentType = files.photo.path;
//         }

//         product.save((err, data) => {
//             if (err) {
//                 res.status(400).json({
//                     error: "Không thể sua được sản phẩm"
//                 })
//             }
//             // data.photo = undefined;
//             res.json(data)
//         })

//     });
// }

export const update = (req, res) => {
    console.log(req.product);
    Product.findOneAndUpdate(
        { _id  : req.product._id },
        { $set : req.body},
        {new : true },(err,product)=>{
          if(err){
            res.status(400).json({
              error : "Không thể update được product"
            })
          }
          res.json(product);
        }
      )
}
export const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}