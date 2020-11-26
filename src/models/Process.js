import mongoose from 'mongoose';

const { Schema } = mongoose;

const processSchema = new Schema({
    process_number: Number,
    description: String,
    complainer: String,
    claimed: String,
    lawyer: String,
    status: [],
    initial_date:
})