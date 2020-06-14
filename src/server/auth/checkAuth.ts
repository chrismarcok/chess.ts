import * as express from "express";
import { IUser } from "../models/User";

type Req = express.Request;
type Res = express.Response;
type Next = express.NextFunction;

export function checkAuthenticated(req: Req, res: Res, next: Next) {
  if (
    req.isAuthenticated() ||
    (req.headers && req.headers.admin_key === process.env.ADMIN_KEY)
  ) {
    return next();
  } else {
    res.redirect("/login");
  }
}

export function checkActivated(req: Req, res: Res, next: Next) {
  if (
    (req.isAuthenticated() && (<IUser>req.user).activated) ||
    (req.headers && req.headers.admin_key === process.env.ADMIN_KEY)
  ) {
    return next();
  } else {
    res.redirect("/login");
  }
}

export function checkAuthenticated403(req: Req, res: Res, next: Next) {
  if (
    req.isAuthenticated() ||
    (req.headers && req.headers.admin_key === process.env.ADMIN_KEY)
  ) {
    return next();
  } else {
    res.sendStatus(403);
  }
}

export function checkAdmin(req: Req, res: Res, next: Next) {
  if (
    (req.user && (<IUser>req.user).admin) ||
    (req.headers && req.headers.admin_key === process.env.ADMIN_KEY)
  ) {
    return next();
  } else {
    res.sendStatus(403);
  }
}

export function checkGuest(req: Req, res: Res, next: Next) {
  if (!req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/");
  }
}
