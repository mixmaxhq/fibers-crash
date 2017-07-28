let throwAsync = true;

function crash() {
  const error = new Error('[fibers-crash] Fiber activity occurred');
  if (!throwAsync) {
    throw error;
  }
  process.nextTick(function() {
    throw error;
  });
}

function Fiber() {
  console.trace('[fibers-crash] Fiber created');
  crash();
}

Fiber.prototype = {
  _configureCrash: function(options) {
    if (options) {
      throwAsync = options.throwAsync === undefined ? true : options.throwAsync;
    }
  },

  get current() {
    console.trace('[fibers-crash] Fiber.current referenced');
    crash();
  },

  yield: function() {
    console.trace('[fibers-crash] Fiber#yield called');
    crash();
  },

  // Don't crash on these, just warn.
  get poolSize() {
    console.trace('[fibers-crash] Fiber.poolSize referenced');
    return 1;
  },

  fibersCreated: function() {
    console.trace('[fibers-crash] Fiber.fibersCreated referenced');
    return 0;
  }
}

module.exports = Fiber;
