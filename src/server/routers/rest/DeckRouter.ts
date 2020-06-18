import * as express from "express";
import { checkAuthenticated403 } from "../../auth/checkAuth";
import Deck from "../../models/Deck";

const router = express.Router();

router.get("/decks", (req, res) => {
  Deck.find()
  .then(decks => {
    if (decks) {
      res.status(200).send(decks);
    } else {
      throw new Error("Error 60001: Could not retreive decks.");
    }
  })
  .catch((err:Error) => {
      console.log(err);
      res.status(500).send({
        status: 500,
        message: err.message,
      })
  });
});

router.post("/decks", checkAuthenticated403, (req, res) => {
  const deck = new Deck({
    cards: req.body
  });

  deck.save()
  .then((r) => {
    res.status(200).send(r);
  })
  .catch((err:Error) => {
    console.log(err);  
    res.status(400).send({
      status: 400,
      message: `Error 60002: Could not create deck. ${err.message}`,
    });
  });
});

export default router;