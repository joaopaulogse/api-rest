const express = require("express");
const passport = require("passport");

const router = express.Router();

router
    .post("/login", passport.authenticate("local",
        { successRedirect: "/users",
            failureRedirect: "/",
            failureFlash: false,
        },
    ));
router
    .post("/logout", (req, res) => {
        req.logout();
        res.redirect("/docs");
    });

module.exports = router;
