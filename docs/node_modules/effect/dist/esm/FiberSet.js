/**
 * @since 2.0.0
 */
import * as Effect from "effect/Effect";
import * as FiberId from "effect/FiberId";
import * as Cause from "./Cause.js";
import * as Deferred from "./Deferred.js";
import * as Exit from "./Exit.js";
import * as Fiber from "./Fiber.js";
import * as FiberRef from "./FiberRef.js";
import { dual } from "./Function.js";
import * as Inspectable from "./Inspectable.js";
import * as Iterable from "./Iterable.js";
import * as Option from "./Option.js";
import { pipeArguments } from "./Pipeable.js";
import * as Predicate from "./Predicate.js";
import * as Runtime from "./Runtime.js";
/**
 * @since 2.0.0
 * @categories type ids
 */
export const TypeId = /*#__PURE__*/Symbol.for("effect/FiberSet");
/**
 * @since 2.0.0
 * @categories refinements
 */
export const isFiberSet = u => Predicate.hasProperty(u, TypeId);
const Proto = {
  [TypeId]: TypeId,
  [Symbol.iterator]() {
    if (this.state._tag === "Closed") {
      return Iterable.empty();
    }
    return this.state.backing[Symbol.iterator]();
  },
  toString() {
    return Inspectable.format(this.toJSON());
  },
  toJSON() {
    return {
      _id: "FiberMap",
      state: this.state
    };
  },
  [Inspectable.NodeInspectSymbol]() {
    return this.toJSON();
  },
  pipe() {
    return pipeArguments(this, arguments);
  }
};
const unsafeMake = (backing, deferred) => {
  const self = Object.create(Proto);
  self.state = {
    _tag: "Open",
    backing
  };
  self.deferred = deferred;
  return self;
};
/**
 * A FiberSet can be used to store a collection of fibers.
 * When the associated Scope is closed, all fibers in the set will be interrupted.
 *
 * You can add fibers to the set using `FiberSet.add` or `FiberSet.run`, and the fibers will
 * be automatically removed from the FiberSet when they complete.
 *
 * @example
 * import { Effect, FiberSet } from "effect"
 *
 * Effect.gen(function*(_) {
 *   const set = yield* _(FiberSet.make())
 *
 *   // run some effects and add the fibers to the set
 *   yield* _(FiberSet.run(set, Effect.never))
 *   yield* _(FiberSet.run(set, Effect.never))
 *
 *   yield* _(Effect.sleep(1000))
 * }).pipe(
 *   Effect.scoped // The fibers will be interrupted when the scope is closed
 * )
 *
 * @since 2.0.0
 * @categories constructors
 */
export const make = () => Effect.acquireRelease(Effect.map(Deferred.make(), deferred => unsafeMake(new Set(), deferred)), set => Effect.zipRight(clear(set), Effect.suspend(() => {
  set.state = {
    _tag: "Closed"
  };
  return Deferred.done(set.deferred, Exit.void);
})));
/**
 * Create an Effect run function that is backed by a FiberSet.
 *
 * @since 2.0.0
 * @categories constructors
 */
export const makeRuntime = () => Effect.flatMap(make(), self => runtime(self)());
/**
 * Add a fiber to the FiberSet. When the fiber completes, it will be removed.
 *
 * @since 2.0.0
 * @categories combinators
 */
export const unsafeAdd = /*#__PURE__*/dual(args => isFiberSet(args[0]), (self, fiber, options) => {
  if (self.state._tag === "Closed") {
    fiber.unsafeInterruptAsFork(options?.interruptAs ?? FiberId.none);
    return;
  } else if (self.state.backing.has(fiber)) {
    return;
  }
  ;
  fiber.setFiberRef(FiberRef.unhandledErrorLogLevel, Option.none());
  self.state.backing.add(fiber);
  fiber.addObserver(exit => {
    if (self.state._tag === "Closed") {
      return;
    }
    self.state.backing.delete(fiber);
    if (Exit.isFailure(exit) && !Cause.isInterruptedOnly(exit.cause)) {
      Deferred.unsafeDone(self.deferred, exit);
    }
  });
});
/**
 * Add a fiber to the FiberSet. When the fiber completes, it will be removed.
 *
 * @since 2.0.0
 * @categories combinators
 */
export const add = /*#__PURE__*/dual(2, (self, fiber) => Effect.fiberIdWith(fiberId => Effect.sync(() => unsafeAdd(self, fiber, {
  interruptAs: fiberId
}))));
/**
 * @since 2.0.0
 * @categories combinators
 */
export const clear = self => Effect.suspend(() => {
  if (self.state._tag === "Closed") {
    return Effect.void;
  }
  return Effect.forEach(self.state.backing, fiber =>
  // will be removed by the observer
  Fiber.interrupt(fiber));
});
/**
 * Fork an Effect and add the forked fiber to the FiberSet.
 * When the fiber completes, it will be removed from the FiberSet.
 *
 * @since 2.0.0
 * @categories combinators
 */
export const run = function () {
  const self = arguments[0];
  if (arguments.length === 1) {
    return effect => Effect.suspend(() => {
      if (self.state._tag === "Closed") {
        return Effect.interrupt;
      }
      return Effect.uninterruptibleMask(restore => Effect.tap(restore(Effect.forkDaemon(effect)), fiber => add(self, fiber)));
    });
  }
  const effect = arguments[1];
  return Effect.suspend(() => {
    if (self.state._tag === "Closed") {
      return Effect.interrupt;
    }
    return Effect.uninterruptibleMask(restore => Effect.tap(restore(Effect.forkDaemon(effect)), fiber => add(self, fiber)));
  });
};
/**
 * Capture a Runtime and use it to fork Effect's, adding the forked fibers to the FiberSet.
 *
 * @example
 * import { Context, Effect, FiberSet } from "effect"
 *
 * interface Users {
 *   readonly _: unique symbol
 * }
 * const Users = Context.GenericTag<Users, {
 *    getAll: Effect.Effect<Array<unknown>>
 * }>("Users")
 *
 * Effect.gen(function*(_) {
 *   const set = yield* _(FiberSet.make())
 *   const run = yield* _(FiberSet.runtime(set)<Users>())
 *
 *   // run some effects and add the fibers to the set
 *   run(Effect.andThen(Users, _ => _.getAll))
 * }).pipe(
 *   Effect.scoped // The fibers will be interrupted when the scope is closed
 * )
 *
 * @since 2.0.0
 * @categories combinators
 */
export const runtime = self => () => Effect.map(Effect.runtime(), runtime => {
  const runFork = Runtime.runFork(runtime);
  return (effect, options) => {
    const fiber = runFork(effect, options);
    unsafeAdd(self, fiber);
    return fiber;
  };
});
/**
 * @since 2.0.0
 * @categories combinators
 */
export const size = self => Effect.sync(() => self.state._tag === "Closed" ? 0 : self.state.backing.size);
/**
 * Join all fibers in the FiberSet. If any of the Fiber's in the set terminate with a failure,
 * the returned Effect will terminate with the first failure that occurred.
 *
 * @since 2.0.0
 * @categories combinators
 * @example
 * import { Effect, FiberSet } from "effect";
 *
 * Effect.gen(function* (_) {
 *   const set = yield* _(FiberSet.make());
 *   yield* _(FiberSet.add(set, Effect.runFork(Effect.fail("error"))));
 *
 *   // parent fiber will fail with "error"
 *   yield* _(FiberSet.join(set));
 * });
 */
export const join = self => Deferred.await(self.deferred);
//# sourceMappingURL=FiberSet.js.map