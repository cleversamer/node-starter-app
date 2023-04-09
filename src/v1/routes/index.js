const router = require("express").Router();
const authRoute = require("./user/auth.route");
const usersRoute = require("./user/users.route");
const loginActivitiesRoute = require("./user/loginActivities.route");
const reviewsRoute = require("./system/reviews.route");

const routes = [
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/users",
    route: usersRoute,
  },
  {
    path: "/activities/login",
    route: loginActivitiesRoute,
  },
  {
    path: "/reviews",
    route: reviewsRoute,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
