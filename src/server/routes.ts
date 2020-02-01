import * as express from 'express';

type Router = express.Router;
type Request = express.Request;
type Response = express.Response;
type NextFunction = express.NextFunction;

const router:Router = express.Router();

router.get('/api/hello', (req:Request, res:Response, next:NextFunction) => {
    res.json('World');
});

export default router;