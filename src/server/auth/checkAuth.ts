import * as express from "express";
import { IUser } from "../models/User";

type Req = express.Request;
type Res = express.Response;
type Next = express.NextFunction;

export function checkAuthenticated(req: Req, res: Res, next:  Next){
  if (req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/');
  }
}

export function checkAuthenticated403(req: Req, res: Res, next:  Next){
  if (req.isAuthenticated()){
    return next();
  } else {
    res.sendStatus(403);
  }
}

export function checkAdmin(req: Req, res: Res, next:  Next){
  if ((<IUser>req.user).admin){
    return next();
  } else {
    res.redirect("/");
  }
}

export function checkGuest(req: Req, res: Res, next:  Next){
  if (!req.isAuthenticated()){
    return next();
  } else {
    res.redirect('/groups');
  }
}