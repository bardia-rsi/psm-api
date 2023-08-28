import joi from "joi";

export const pid: joi.StringSchema = joi.string().lowercase().trim().length(32).pattern(/^[a-f0-9]+$/).messages({"string.pattern.match": `Invalid ID`});
export const url: joi.StringSchema = joi.string().lowercase().trim().max(1024).uri({ domain: {} });
export const email: joi.StringSchema = joi.string().lowercase().trim().max(256).email();
export const phoneNumber: joi.StringSchema = joi.string().trim().length(10).pattern(/^\d+$/).messages({"string.pattern.match": `"Phone Number" must only contain numbers.`});
export const name: joi.StringSchema = joi.string().trim().max(128).pattern(/^[A-Za-z\s]+$/).messages({"string.pattern.match": `"Name" must only contain alphabet characters`});
export const dateOfBirth: joi.DateSchema = joi.date().greater("1900-01-01").less("now").timestamp("javascript");
export const address: joi.StringSchema = joi.string().trim().max(256);
export const note: joi.StringSchema = joi.string().trim().max(2048);
export const favorite: joi.DateSchema = joi.date().greater("2023-04-18").less("now").timestamp("javascript").allow(null);
export const trash: joi.DateSchema = joi.date().greater("2023-04-18").less("now").timestamp("javascript").allow(null);
export const password: joi.StringSchema = joi.string().min(8).max(2048).required();

export const color: joi.StringSchema = joi.string().length(7).pattern(/^#[a-f0-9]+$/i).messages({"string.pattern.match": `Invalid hex color`});

// Base properties for data types
export const BaseDataType = { note, favorite, trash };