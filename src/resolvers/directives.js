// @flow

export default {
  isAuthenticated: (
    next: Function,
    source: Object,
    args: Object,
    ctx: Object
  ) => {
    checkUser(ctx.user);
    return next();
  }
};

function checkUser(user: ?Object) {
  if (!user) {
    throw new Error('Invalid token!');
  }
}
