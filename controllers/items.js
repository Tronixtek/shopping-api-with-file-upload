const item = require("../models/item");
const fs = require('fs');

exports.postitem = (req, res, next) => {
    req.body.thing = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const item_b = new item({
        name: req.body.thing.name,
        description: req.body.thing.des,
        price: req.body.thing.price,
        imageUrl: url + '/images/' + req.file.filename
    });
    item_b.save().then(
        () => {
            res.status(201).json("success");
        }
    ).catch((error) => {
        res.status(301).json("there was a problem try again");
    })

}

exports.get_items = (req, res, next) => {
    item.find().then(
        (item) => {
            res.status(200).json(item);
        }
    ).catch((error) => {
        res.status(400).json({ error: error });
    })
}

exports.get_one_item = (req, res, next) => {
    item.findOne({ _id: req.params.id }).then((item) => {
        res.status(201).json({ item: item });
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    })
}

exports.update_one_item = (req, res, next) => {
    let thing = new thing({ id: req.params._id });
    if (req.file) {
        req.body.thing = JSON.parse(req.body.thing);
        const url = req.protocol + '://' + req.get('host');
        item_b = {
            name: req.body.thing.name,
            description: req.body.thing.des,
            price: req.body.thing.price,
            imageUrl: url + '/images/' + req.file.filename
        }
    }
    else {
        item_b = item({
            _id: req.params.id,
            name: req.body.name,
            description: req.body.des,
            price: req.body.price,
            imageUrl: req.body.image
        });
    }

    item.updateOne({ _id: req.params.id }, item_b).then(() => {
        res.status(200).json({ message: "Update Success" });
    }).catch((error) => {
        res.status(400).json({ error: error.message });
    })

}

exports.delete_one_item = (req, res, next) => {
    item.findOne({ _id: req.params.id }).then(
        (thing) => {
            const filename = thing.imageUrl.split('/images/')[1];
            fs.unlink('images/' + filename, () => {
                item.deleteOne({ _id: req.params.id }).then(() => {
                    res.status(200).json({ message: "item deleted successfully" });
                }).catch(
                    (error) => {
                        res.status(400).json({ error: error.message });
                    }
                );
            })
        }
    )
}