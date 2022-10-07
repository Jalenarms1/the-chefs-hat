const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const nodemailer = require("nodemailer");
const Owner = require("./Owner");

const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'dev.test.jalen@gmail.com',
        pass: 'thvfzaufouoaavwn'
    }
});


class Review extends Model {
    sendBadReview = async (ownerId, review, mealId) => {
        let ownerOfReviewed =  await Owner.findOne({
            where: {
                id: ownerId
            },
            attributes: { exclude: ["password", "full_name"]}
        })

        let details = {
            from: 'dev.test.jalen@gmail.com',
            to: ownerOfReviewed.email,
            subject: `Item id: ${mealId} received a bad review!`,
            text: review
        }
    
        mailTransporter.sendMail(details, err => {
            if(err) console.log(err);
            if(!err) console.log("Sent");
        })
    
    }
}

Review.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        mealId: {
            type: DataTypes.INTEGER,
            references: {
                model: 'meal',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        underscored: true,
        freezeTableName: true,
        modelName: 'review'
    }
);

module.exports = Review;