import AWS from "aws-sdk";
import dotenv from "dotenv";
import { User } from "../interfaces/Types";
import { User_Table_Name } from "../config/Constants";

dotenv.config();

AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const dynamoUser = new AWS.DynamoDB.DocumentClient();

// Find a user by email
const findUserByEmail = async (email: string): Promise<User | null> => {
    const params = {
        TableName: User_Table_Name,
        FilterExpression: "email = :email",
        ExpressionAttributeValues: { ":email": email },
    };

    try {
        const response = await dynamoUser.scan(params).promise();

        return response.Count && response.Count! > 0
            ? (response.Items![0] as User)
            : null;
    } catch (error) {
        console.log(error);
        throw new Error("Error while searching User by email");
    }
};

// Create a new user
const createUser = async (user: User): Promise<void> => {
    const params = { TableName: User_Table_Name, Item: user };

    try {
        await dynamoUser.put(params).promise();
    } catch {
        throw new Error("Error while Creating a newUser in dynamoDB");
    }
};


export { findUserByEmail, createUser };