
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Room
 * 
 */
export type Room = $Result.DefaultSelection<Prisma.$RoomPayload>
/**
 * Model ParticipantSession
 * 
 */
export type ParticipantSession = $Result.DefaultSelection<Prisma.$ParticipantSessionPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<'extends', Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.room`: Exposes CRUD operations for the **Room** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Rooms
    * const rooms = await prisma.room.findMany()
    * ```
    */
  get room(): Prisma.RoomDelegate<ExtArgs>;

  /**
   * `prisma.participantSession`: Exposes CRUD operations for the **ParticipantSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ParticipantSessions
    * const participantSessions = await prisma.participantSession.findMany()
    * ```
    */
  get participantSession(): Prisma.ParticipantSessionDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.13.0
   * Query Engine version: b9a39a7ee606c28e3455d0fd60e78c3ba82b1a2b
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray | { toJSON(): unknown }

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Room: 'Room',
    ParticipantSession: 'ParticipantSession'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }


  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs}, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    meta: {
      modelProps: 'user' | 'room' | 'participantSession'
      txIsolationLevel: Prisma.TransactionIsolationLevel
    },
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>,
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>,
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Room: {
        payload: Prisma.$RoomPayload<ExtArgs>
        fields: Prisma.RoomFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RoomFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RoomFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findFirst: {
            args: Prisma.RoomFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RoomFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          findMany: {
            args: Prisma.RoomFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>[]
          }
          create: {
            args: Prisma.RoomCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          createMany: {
            args: Prisma.RoomCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.RoomDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          update: {
            args: Prisma.RoomUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          deleteMany: {
            args: Prisma.RoomDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.RoomUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.RoomUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$RoomPayload>
          }
          aggregate: {
            args: Prisma.RoomAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateRoom>
          }
          groupBy: {
            args: Prisma.RoomGroupByArgs<ExtArgs>,
            result: $Utils.Optional<RoomGroupByOutputType>[]
          }
          count: {
            args: Prisma.RoomCountArgs<ExtArgs>,
            result: $Utils.Optional<RoomCountAggregateOutputType> | number
          }
        }
      }
      ParticipantSession: {
        payload: Prisma.$ParticipantSessionPayload<ExtArgs>
        fields: Prisma.ParticipantSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ParticipantSessionFindUniqueArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ParticipantSessionFindUniqueOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          findFirst: {
            args: Prisma.ParticipantSessionFindFirstArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ParticipantSessionFindFirstOrThrowArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          findMany: {
            args: Prisma.ParticipantSessionFindManyArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>[]
          }
          create: {
            args: Prisma.ParticipantSessionCreateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          createMany: {
            args: Prisma.ParticipantSessionCreateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          delete: {
            args: Prisma.ParticipantSessionDeleteArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          update: {
            args: Prisma.ParticipantSessionUpdateArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          deleteMany: {
            args: Prisma.ParticipantSessionDeleteManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          updateMany: {
            args: Prisma.ParticipantSessionUpdateManyArgs<ExtArgs>,
            result: Prisma.BatchPayload
          }
          upsert: {
            args: Prisma.ParticipantSessionUpsertArgs<ExtArgs>,
            result: $Utils.PayloadToResult<Prisma.$ParticipantSessionPayload>
          }
          aggregate: {
            args: Prisma.ParticipantSessionAggregateArgs<ExtArgs>,
            result: $Utils.Optional<AggregateParticipantSession>
          }
          groupBy: {
            args: Prisma.ParticipantSessionGroupByArgs<ExtArgs>,
            result: $Utils.Optional<ParticipantSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.ParticipantSessionCountArgs<ExtArgs>,
            result: $Utils.Optional<ParticipantSessionCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<'define', Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    participant_sessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_sessions?: boolean | UserCountOutputTypeCountParticipant_sessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountParticipant_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantSessionWhereInput
  }


  /**
   * Count Type RoomCountOutputType
   */

  export type RoomCountOutputType = {
    participant_sessions: number
  }

  export type RoomCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_sessions?: boolean | RoomCountOutputTypeCountParticipant_sessionsArgs
  }

  // Custom InputTypes
  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RoomCountOutputType
     */
    select?: RoomCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RoomCountOutputType without action
   */
  export type RoomCountOutputTypeCountParticipant_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantSessionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    created_at: Date | null
    last_seen: Date | null
    optional_display_name: string | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    created_at: Date | null
    last_seen: Date | null
    optional_display_name: string | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    created_at: number
    last_seen: number
    optional_display_name: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    created_at?: true
    last_seen?: true
    optional_display_name?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    created_at?: true
    last_seen?: true
    optional_display_name?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    created_at?: true
    last_seen?: true
    optional_display_name?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    created_at: Date
    last_seen: Date
    optional_display_name: string | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    created_at?: boolean
    last_seen?: boolean
    optional_display_name?: boolean
    participant_sessions?: boolean | User$participant_sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    created_at?: boolean
    last_seen?: boolean
    optional_display_name?: boolean
  }


  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_sessions?: boolean | User$participant_sessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      participant_sessions: Prisma.$ParticipantSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      created_at: Date
      last_seen: Date
      optional_display_name: string | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }


  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends UserFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends UserFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends UserFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
    **/
    create<T extends UserCreateArgs<ExtArgs>>(
      args: SelectSubset<T, UserCreateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Users.
     *     @param {UserCreateManyArgs} args - Arguments to create many Users.
     *     @example
     *     // Create many Users
     *     const user = await prisma.user.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends UserCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
    **/
    delete<T extends UserDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, UserDeleteArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends UserUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends UserDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends UserUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
    **/
    upsert<T extends UserUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, UserUpsertArgs<ExtArgs>>
    ): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    participant_sessions<T extends User$participant_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$participant_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly created_at: FieldRef<"User", 'DateTime'>
    readonly last_seen: FieldRef<"User", 'DateTime'>
    readonly optional_display_name: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data?: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.participant_sessions
   */
  export type User$participant_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    where?: ParticipantSessionWhereInput
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    cursor?: ParticipantSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantSessionScalarFieldEnum | ParticipantSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Room
   */

  export type AggregateRoom = {
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  export type RoomAvgAggregateOutputType = {
    max_participants: number | null
  }

  export type RoomSumAggregateOutputType = {
    max_participants: number | null
  }

  export type RoomMinAggregateOutputType = {
    id: string | null
    room_code: string | null
    host_user_id: string | null
    created_at: Date | null
    is_active: boolean | null
    max_participants: number | null
  }

  export type RoomMaxAggregateOutputType = {
    id: string | null
    room_code: string | null
    host_user_id: string | null
    created_at: Date | null
    is_active: boolean | null
    max_participants: number | null
  }

  export type RoomCountAggregateOutputType = {
    id: number
    room_code: number
    host_user_id: number
    created_at: number
    is_active: number
    max_participants: number
    _all: number
  }


  export type RoomAvgAggregateInputType = {
    max_participants?: true
  }

  export type RoomSumAggregateInputType = {
    max_participants?: true
  }

  export type RoomMinAggregateInputType = {
    id?: true
    room_code?: true
    host_user_id?: true
    created_at?: true
    is_active?: true
    max_participants?: true
  }

  export type RoomMaxAggregateInputType = {
    id?: true
    room_code?: true
    host_user_id?: true
    created_at?: true
    is_active?: true
    max_participants?: true
  }

  export type RoomCountAggregateInputType = {
    id?: true
    room_code?: true
    host_user_id?: true
    created_at?: true
    is_active?: true
    max_participants?: true
    _all?: true
  }

  export type RoomAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Room to aggregate.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Rooms
    **/
    _count?: true | RoomCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RoomAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RoomSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RoomMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RoomMaxAggregateInputType
  }

  export type GetRoomAggregateType<T extends RoomAggregateArgs> = {
        [P in keyof T & keyof AggregateRoom]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRoom[P]>
      : GetScalarType<T[P], AggregateRoom[P]>
  }




  export type RoomGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RoomWhereInput
    orderBy?: RoomOrderByWithAggregationInput | RoomOrderByWithAggregationInput[]
    by: RoomScalarFieldEnum[] | RoomScalarFieldEnum
    having?: RoomScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RoomCountAggregateInputType | true
    _avg?: RoomAvgAggregateInputType
    _sum?: RoomSumAggregateInputType
    _min?: RoomMinAggregateInputType
    _max?: RoomMaxAggregateInputType
  }

  export type RoomGroupByOutputType = {
    id: string
    room_code: string
    host_user_id: string
    created_at: Date
    is_active: boolean
    max_participants: number
    _count: RoomCountAggregateOutputType | null
    _avg: RoomAvgAggregateOutputType | null
    _sum: RoomSumAggregateOutputType | null
    _min: RoomMinAggregateOutputType | null
    _max: RoomMaxAggregateOutputType | null
  }

  type GetRoomGroupByPayload<T extends RoomGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RoomGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RoomGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RoomGroupByOutputType[P]>
            : GetScalarType<T[P], RoomGroupByOutputType[P]>
        }
      >
    >


  export type RoomSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_code?: boolean
    host_user_id?: boolean
    created_at?: boolean
    is_active?: boolean
    max_participants?: boolean
    participant_sessions?: boolean | Room$participant_sessionsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["room"]>

  export type RoomSelectScalar = {
    id?: boolean
    room_code?: boolean
    host_user_id?: boolean
    created_at?: boolean
    is_active?: boolean
    max_participants?: boolean
  }


  export type RoomInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    participant_sessions?: boolean | Room$participant_sessionsArgs<ExtArgs>
    _count?: boolean | RoomCountOutputTypeDefaultArgs<ExtArgs>
  }


  export type $RoomPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Room"
    objects: {
      participant_sessions: Prisma.$ParticipantSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_code: string
      host_user_id: string
      created_at: Date
      is_active: boolean
      max_participants: number
    }, ExtArgs["result"]["room"]>
    composites: {}
  }


  type RoomGetPayload<S extends boolean | null | undefined | RoomDefaultArgs> = $Result.GetResult<Prisma.$RoomPayload, S>

  type RoomCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<RoomFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: RoomCountAggregateInputType | true
    }

  export interface RoomDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Room'], meta: { name: 'Room' } }
    /**
     * Find zero or one Room that matches the filter.
     * @param {RoomFindUniqueArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends RoomFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, RoomFindUniqueArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one Room that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {RoomFindUniqueOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends RoomFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first Room that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends RoomFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomFindFirstArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first Room that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindFirstOrThrowArgs} args - Arguments to find a Room
     * @example
     * // Get one Room
     * const room = await prisma.room.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends RoomFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more Rooms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Rooms
     * const rooms = await prisma.room.findMany()
     * 
     * // Get first 10 Rooms
     * const rooms = await prisma.room.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const roomWithIdOnly = await prisma.room.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends RoomFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a Room.
     * @param {RoomCreateArgs} args - Arguments to create a Room.
     * @example
     * // Create one Room
     * const Room = await prisma.room.create({
     *   data: {
     *     // ... data to create a Room
     *   }
     * })
     * 
    **/
    create<T extends RoomCreateArgs<ExtArgs>>(
      args: SelectSubset<T, RoomCreateArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many Rooms.
     *     @param {RoomCreateManyArgs} args - Arguments to create many Rooms.
     *     @example
     *     // Create many Rooms
     *     const room = await prisma.room.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends RoomCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Room.
     * @param {RoomDeleteArgs} args - Arguments to delete one Room.
     * @example
     * // Delete one Room
     * const Room = await prisma.room.delete({
     *   where: {
     *     // ... filter to delete one Room
     *   }
     * })
     * 
    **/
    delete<T extends RoomDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, RoomDeleteArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one Room.
     * @param {RoomUpdateArgs} args - Arguments to update one Room.
     * @example
     * // Update one Room
     * const room = await prisma.room.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends RoomUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, RoomUpdateArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more Rooms.
     * @param {RoomDeleteManyArgs} args - Arguments to filter Rooms to delete.
     * @example
     * // Delete a few Rooms
     * const { count } = await prisma.room.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends RoomDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, RoomDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Rooms
     * const room = await prisma.room.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends RoomUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, RoomUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Room.
     * @param {RoomUpsertArgs} args - Arguments to update or create a Room.
     * @example
     * // Update or create a Room
     * const room = await prisma.room.upsert({
     *   create: {
     *     // ... data to create a Room
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Room we want to update
     *   }
     * })
    **/
    upsert<T extends RoomUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, RoomUpsertArgs<ExtArgs>>
    ): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of Rooms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomCountArgs} args - Arguments to filter Rooms to count.
     * @example
     * // Count the number of Rooms
     * const count = await prisma.room.count({
     *   where: {
     *     // ... the filter for the Rooms we want to count
     *   }
     * })
    **/
    count<T extends RoomCountArgs>(
      args?: Subset<T, RoomCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RoomCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RoomAggregateArgs>(args: Subset<T, RoomAggregateArgs>): Prisma.PrismaPromise<GetRoomAggregateType<T>>

    /**
     * Group by Room.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RoomGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RoomGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RoomGroupByArgs['orderBy'] }
        : { orderBy?: RoomGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RoomGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRoomGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Room model
   */
  readonly fields: RoomFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Room.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RoomClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    participant_sessions<T extends Room$participant_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, Room$participant_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findMany'> | Null>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the Room model
   */ 
  interface RoomFieldRefs {
    readonly id: FieldRef<"Room", 'String'>
    readonly room_code: FieldRef<"Room", 'String'>
    readonly host_user_id: FieldRef<"Room", 'String'>
    readonly created_at: FieldRef<"Room", 'DateTime'>
    readonly is_active: FieldRef<"Room", 'Boolean'>
    readonly max_participants: FieldRef<"Room", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Room findUnique
   */
  export type RoomFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findUniqueOrThrow
   */
  export type RoomFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room findFirst
   */
  export type RoomFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findFirstOrThrow
   */
  export type RoomFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Room to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Rooms.
     */
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room findMany
   */
  export type RoomFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter, which Rooms to fetch.
     */
    where?: RoomWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Rooms to fetch.
     */
    orderBy?: RoomOrderByWithRelationInput | RoomOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Rooms.
     */
    cursor?: RoomWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Rooms from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Rooms.
     */
    skip?: number
    distinct?: RoomScalarFieldEnum | RoomScalarFieldEnum[]
  }

  /**
   * Room create
   */
  export type RoomCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to create a Room.
     */
    data: XOR<RoomCreateInput, RoomUncheckedCreateInput>
  }

  /**
   * Room createMany
   */
  export type RoomCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Rooms.
     */
    data: RoomCreateManyInput | RoomCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Room update
   */
  export type RoomUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The data needed to update a Room.
     */
    data: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
    /**
     * Choose, which Room to update.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room updateMany
   */
  export type RoomUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Rooms.
     */
    data: XOR<RoomUpdateManyMutationInput, RoomUncheckedUpdateManyInput>
    /**
     * Filter which Rooms to update
     */
    where?: RoomWhereInput
  }

  /**
   * Room upsert
   */
  export type RoomUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * The filter to search for the Room to update in case it exists.
     */
    where: RoomWhereUniqueInput
    /**
     * In case the Room found by the `where` argument doesn't exist, create a new Room with this data.
     */
    create: XOR<RoomCreateInput, RoomUncheckedCreateInput>
    /**
     * In case the Room was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RoomUpdateInput, RoomUncheckedUpdateInput>
  }

  /**
   * Room delete
   */
  export type RoomDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
    /**
     * Filter which Room to delete.
     */
    where: RoomWhereUniqueInput
  }

  /**
   * Room deleteMany
   */
  export type RoomDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Rooms to delete
     */
    where?: RoomWhereInput
  }

  /**
   * Room.participant_sessions
   */
  export type Room$participant_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    where?: ParticipantSessionWhereInput
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    cursor?: ParticipantSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ParticipantSessionScalarFieldEnum | ParticipantSessionScalarFieldEnum[]
  }

  /**
   * Room without action
   */
  export type RoomDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Room
     */
    select?: RoomSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RoomInclude<ExtArgs> | null
  }


  /**
   * Model ParticipantSession
   */

  export type AggregateParticipantSession = {
    _count: ParticipantSessionCountAggregateOutputType | null
    _min: ParticipantSessionMinAggregateOutputType | null
    _max: ParticipantSessionMaxAggregateOutputType | null
  }

  export type ParticipantSessionMinAggregateOutputType = {
    id: string | null
    room_id: string | null
    user_id: string | null
    socket_id: string | null
    connection_status: string | null
    joined_at: Date | null
    left_at: Date | null
  }

  export type ParticipantSessionMaxAggregateOutputType = {
    id: string | null
    room_id: string | null
    user_id: string | null
    socket_id: string | null
    connection_status: string | null
    joined_at: Date | null
    left_at: Date | null
  }

  export type ParticipantSessionCountAggregateOutputType = {
    id: number
    room_id: number
    user_id: number
    socket_id: number
    connection_status: number
    joined_at: number
    left_at: number
    _all: number
  }


  export type ParticipantSessionMinAggregateInputType = {
    id?: true
    room_id?: true
    user_id?: true
    socket_id?: true
    connection_status?: true
    joined_at?: true
    left_at?: true
  }

  export type ParticipantSessionMaxAggregateInputType = {
    id?: true
    room_id?: true
    user_id?: true
    socket_id?: true
    connection_status?: true
    joined_at?: true
    left_at?: true
  }

  export type ParticipantSessionCountAggregateInputType = {
    id?: true
    room_id?: true
    user_id?: true
    socket_id?: true
    connection_status?: true
    joined_at?: true
    left_at?: true
    _all?: true
  }

  export type ParticipantSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantSession to aggregate.
     */
    where?: ParticipantSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantSessions to fetch.
     */
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ParticipantSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ParticipantSessions
    **/
    _count?: true | ParticipantSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ParticipantSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ParticipantSessionMaxAggregateInputType
  }

  export type GetParticipantSessionAggregateType<T extends ParticipantSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateParticipantSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateParticipantSession[P]>
      : GetScalarType<T[P], AggregateParticipantSession[P]>
  }




  export type ParticipantSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ParticipantSessionWhereInput
    orderBy?: ParticipantSessionOrderByWithAggregationInput | ParticipantSessionOrderByWithAggregationInput[]
    by: ParticipantSessionScalarFieldEnum[] | ParticipantSessionScalarFieldEnum
    having?: ParticipantSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ParticipantSessionCountAggregateInputType | true
    _min?: ParticipantSessionMinAggregateInputType
    _max?: ParticipantSessionMaxAggregateInputType
  }

  export type ParticipantSessionGroupByOutputType = {
    id: string
    room_id: string
    user_id: string
    socket_id: string
    connection_status: string
    joined_at: Date
    left_at: Date | null
    _count: ParticipantSessionCountAggregateOutputType | null
    _min: ParticipantSessionMinAggregateOutputType | null
    _max: ParticipantSessionMaxAggregateOutputType | null
  }

  type GetParticipantSessionGroupByPayload<T extends ParticipantSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ParticipantSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ParticipantSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ParticipantSessionGroupByOutputType[P]>
            : GetScalarType<T[P], ParticipantSessionGroupByOutputType[P]>
        }
      >
    >


  export type ParticipantSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    room_id?: boolean
    user_id?: boolean
    socket_id?: boolean
    connection_status?: boolean
    joined_at?: boolean
    left_at?: boolean
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["participantSession"]>

  export type ParticipantSessionSelectScalar = {
    id?: boolean
    room_id?: boolean
    user_id?: boolean
    socket_id?: boolean
    connection_status?: boolean
    joined_at?: boolean
    left_at?: boolean
  }


  export type ParticipantSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    room?: boolean | RoomDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }


  export type $ParticipantSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ParticipantSession"
    objects: {
      room: Prisma.$RoomPayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      room_id: string
      user_id: string
      socket_id: string
      connection_status: string
      joined_at: Date
      left_at: Date | null
    }, ExtArgs["result"]["participantSession"]>
    composites: {}
  }


  type ParticipantSessionGetPayload<S extends boolean | null | undefined | ParticipantSessionDefaultArgs> = $Result.GetResult<Prisma.$ParticipantSessionPayload, S>

  type ParticipantSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ParticipantSessionFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ParticipantSessionCountAggregateInputType | true
    }

  export interface ParticipantSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ParticipantSession'], meta: { name: 'ParticipantSession' } }
    /**
     * Find zero or one ParticipantSession that matches the filter.
     * @param {ParticipantSessionFindUniqueArgs} args - Arguments to find a ParticipantSession
     * @example
     * // Get one ParticipantSession
     * const participantSession = await prisma.participantSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends ParticipantSessionFindUniqueArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionFindUniqueArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findUnique'> | null, null, ExtArgs>

    /**
     * Find one ParticipantSession that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {ParticipantSessionFindUniqueOrThrowArgs} args - Arguments to find a ParticipantSession
     * @example
     * // Get one ParticipantSession
     * const participantSession = await prisma.participantSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends ParticipantSessionFindUniqueOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionFindUniqueOrThrowArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findUniqueOrThrow'>, never, ExtArgs>

    /**
     * Find the first ParticipantSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionFindFirstArgs} args - Arguments to find a ParticipantSession
     * @example
     * // Get one ParticipantSession
     * const participantSession = await prisma.participantSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends ParticipantSessionFindFirstArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionFindFirstArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findFirst'> | null, null, ExtArgs>

    /**
     * Find the first ParticipantSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionFindFirstOrThrowArgs} args - Arguments to find a ParticipantSession
     * @example
     * // Get one ParticipantSession
     * const participantSession = await prisma.participantSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends ParticipantSessionFindFirstOrThrowArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionFindFirstOrThrowArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findFirstOrThrow'>, never, ExtArgs>

    /**
     * Find zero or more ParticipantSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ParticipantSessions
     * const participantSessions = await prisma.participantSession.findMany()
     * 
     * // Get first 10 ParticipantSessions
     * const participantSessions = await prisma.participantSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const participantSessionWithIdOnly = await prisma.participantSession.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends ParticipantSessionFindManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionFindManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'findMany'>>

    /**
     * Create a ParticipantSession.
     * @param {ParticipantSessionCreateArgs} args - Arguments to create a ParticipantSession.
     * @example
     * // Create one ParticipantSession
     * const ParticipantSession = await prisma.participantSession.create({
     *   data: {
     *     // ... data to create a ParticipantSession
     *   }
     * })
     * 
    **/
    create<T extends ParticipantSessionCreateArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionCreateArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'create'>, never, ExtArgs>

    /**
     * Create many ParticipantSessions.
     *     @param {ParticipantSessionCreateManyArgs} args - Arguments to create many ParticipantSessions.
     *     @example
     *     // Create many ParticipantSessions
     *     const participantSession = await prisma.participantSession.createMany({
     *       data: {
     *         // ... provide data here
     *       }
     *     })
     *     
    **/
    createMany<T extends ParticipantSessionCreateManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionCreateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ParticipantSession.
     * @param {ParticipantSessionDeleteArgs} args - Arguments to delete one ParticipantSession.
     * @example
     * // Delete one ParticipantSession
     * const ParticipantSession = await prisma.participantSession.delete({
     *   where: {
     *     // ... filter to delete one ParticipantSession
     *   }
     * })
     * 
    **/
    delete<T extends ParticipantSessionDeleteArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionDeleteArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'delete'>, never, ExtArgs>

    /**
     * Update one ParticipantSession.
     * @param {ParticipantSessionUpdateArgs} args - Arguments to update one ParticipantSession.
     * @example
     * // Update one ParticipantSession
     * const participantSession = await prisma.participantSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends ParticipantSessionUpdateArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionUpdateArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'update'>, never, ExtArgs>

    /**
     * Delete zero or more ParticipantSessions.
     * @param {ParticipantSessionDeleteManyArgs} args - Arguments to filter ParticipantSessions to delete.
     * @example
     * // Delete a few ParticipantSessions
     * const { count } = await prisma.participantSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends ParticipantSessionDeleteManyArgs<ExtArgs>>(
      args?: SelectSubset<T, ParticipantSessionDeleteManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ParticipantSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ParticipantSessions
     * const participantSession = await prisma.participantSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends ParticipantSessionUpdateManyArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionUpdateManyArgs<ExtArgs>>
    ): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ParticipantSession.
     * @param {ParticipantSessionUpsertArgs} args - Arguments to update or create a ParticipantSession.
     * @example
     * // Update or create a ParticipantSession
     * const participantSession = await prisma.participantSession.upsert({
     *   create: {
     *     // ... data to create a ParticipantSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ParticipantSession we want to update
     *   }
     * })
    **/
    upsert<T extends ParticipantSessionUpsertArgs<ExtArgs>>(
      args: SelectSubset<T, ParticipantSessionUpsertArgs<ExtArgs>>
    ): Prisma__ParticipantSessionClient<$Result.GetResult<Prisma.$ParticipantSessionPayload<ExtArgs>, T, 'upsert'>, never, ExtArgs>

    /**
     * Count the number of ParticipantSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionCountArgs} args - Arguments to filter ParticipantSessions to count.
     * @example
     * // Count the number of ParticipantSessions
     * const count = await prisma.participantSession.count({
     *   where: {
     *     // ... the filter for the ParticipantSessions we want to count
     *   }
     * })
    **/
    count<T extends ParticipantSessionCountArgs>(
      args?: Subset<T, ParticipantSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ParticipantSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ParticipantSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ParticipantSessionAggregateArgs>(args: Subset<T, ParticipantSessionAggregateArgs>): Prisma.PrismaPromise<GetParticipantSessionAggregateType<T>>

    /**
     * Group by ParticipantSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ParticipantSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ParticipantSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ParticipantSessionGroupByArgs['orderBy'] }
        : { orderBy?: ParticipantSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ParticipantSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipantSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ParticipantSession model
   */
  readonly fields: ParticipantSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ParticipantSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ParticipantSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: 'PrismaPromise';

    room<T extends RoomDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RoomDefaultArgs<ExtArgs>>): Prisma__RoomClient<$Result.GetResult<Prisma.$RoomPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'> | Null, Null, ExtArgs>;

    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>;
  }



  /**
   * Fields of the ParticipantSession model
   */ 
  interface ParticipantSessionFieldRefs {
    readonly id: FieldRef<"ParticipantSession", 'String'>
    readonly room_id: FieldRef<"ParticipantSession", 'String'>
    readonly user_id: FieldRef<"ParticipantSession", 'String'>
    readonly socket_id: FieldRef<"ParticipantSession", 'String'>
    readonly connection_status: FieldRef<"ParticipantSession", 'String'>
    readonly joined_at: FieldRef<"ParticipantSession", 'DateTime'>
    readonly left_at: FieldRef<"ParticipantSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ParticipantSession findUnique
   */
  export type ParticipantSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantSession to fetch.
     */
    where: ParticipantSessionWhereUniqueInput
  }

  /**
   * ParticipantSession findUniqueOrThrow
   */
  export type ParticipantSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantSession to fetch.
     */
    where: ParticipantSessionWhereUniqueInput
  }

  /**
   * ParticipantSession findFirst
   */
  export type ParticipantSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantSession to fetch.
     */
    where?: ParticipantSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantSessions to fetch.
     */
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantSessions.
     */
    cursor?: ParticipantSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantSessions.
     */
    distinct?: ParticipantSessionScalarFieldEnum | ParticipantSessionScalarFieldEnum[]
  }

  /**
   * ParticipantSession findFirstOrThrow
   */
  export type ParticipantSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantSession to fetch.
     */
    where?: ParticipantSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantSessions to fetch.
     */
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ParticipantSessions.
     */
    cursor?: ParticipantSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ParticipantSessions.
     */
    distinct?: ParticipantSessionScalarFieldEnum | ParticipantSessionScalarFieldEnum[]
  }

  /**
   * ParticipantSession findMany
   */
  export type ParticipantSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter, which ParticipantSessions to fetch.
     */
    where?: ParticipantSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ParticipantSessions to fetch.
     */
    orderBy?: ParticipantSessionOrderByWithRelationInput | ParticipantSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ParticipantSessions.
     */
    cursor?: ParticipantSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ParticipantSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ParticipantSessions.
     */
    skip?: number
    distinct?: ParticipantSessionScalarFieldEnum | ParticipantSessionScalarFieldEnum[]
  }

  /**
   * ParticipantSession create
   */
  export type ParticipantSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a ParticipantSession.
     */
    data: XOR<ParticipantSessionCreateInput, ParticipantSessionUncheckedCreateInput>
  }

  /**
   * ParticipantSession createMany
   */
  export type ParticipantSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ParticipantSessions.
     */
    data: ParticipantSessionCreateManyInput | ParticipantSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ParticipantSession update
   */
  export type ParticipantSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a ParticipantSession.
     */
    data: XOR<ParticipantSessionUpdateInput, ParticipantSessionUncheckedUpdateInput>
    /**
     * Choose, which ParticipantSession to update.
     */
    where: ParticipantSessionWhereUniqueInput
  }

  /**
   * ParticipantSession updateMany
   */
  export type ParticipantSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ParticipantSessions.
     */
    data: XOR<ParticipantSessionUpdateManyMutationInput, ParticipantSessionUncheckedUpdateManyInput>
    /**
     * Filter which ParticipantSessions to update
     */
    where?: ParticipantSessionWhereInput
  }

  /**
   * ParticipantSession upsert
   */
  export type ParticipantSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the ParticipantSession to update in case it exists.
     */
    where: ParticipantSessionWhereUniqueInput
    /**
     * In case the ParticipantSession found by the `where` argument doesn't exist, create a new ParticipantSession with this data.
     */
    create: XOR<ParticipantSessionCreateInput, ParticipantSessionUncheckedCreateInput>
    /**
     * In case the ParticipantSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ParticipantSessionUpdateInput, ParticipantSessionUncheckedUpdateInput>
  }

  /**
   * ParticipantSession delete
   */
  export type ParticipantSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
    /**
     * Filter which ParticipantSession to delete.
     */
    where: ParticipantSessionWhereUniqueInput
  }

  /**
   * ParticipantSession deleteMany
   */
  export type ParticipantSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ParticipantSessions to delete
     */
    where?: ParticipantSessionWhereInput
  }

  /**
   * ParticipantSession without action
   */
  export type ParticipantSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ParticipantSession
     */
    select?: ParticipantSessionSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ParticipantSessionInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    created_at: 'created_at',
    last_seen: 'last_seen',
    optional_display_name: 'optional_display_name'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const RoomScalarFieldEnum: {
    id: 'id',
    room_code: 'room_code',
    host_user_id: 'host_user_id',
    created_at: 'created_at',
    is_active: 'is_active',
    max_participants: 'max_participants'
  };

  export type RoomScalarFieldEnum = (typeof RoomScalarFieldEnum)[keyof typeof RoomScalarFieldEnum]


  export const ParticipantSessionScalarFieldEnum: {
    id: 'id',
    room_id: 'room_id',
    user_id: 'user_id',
    socket_id: 'socket_id',
    connection_status: 'connection_status',
    joined_at: 'joined_at',
    left_at: 'left_at'
  };

  export type ParticipantSessionScalarFieldEnum = (typeof ParticipantSessionScalarFieldEnum)[keyof typeof ParticipantSessionScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: UuidFilter<"User"> | string
    created_at?: DateTimeFilter<"User"> | Date | string
    last_seen?: DateTimeFilter<"User"> | Date | string
    optional_display_name?: StringNullableFilter<"User"> | string | null
    participant_sessions?: ParticipantSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    created_at?: SortOrder
    last_seen?: SortOrder
    optional_display_name?: SortOrderInput | SortOrder
    participant_sessions?: ParticipantSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    created_at?: DateTimeFilter<"User"> | Date | string
    last_seen?: DateTimeFilter<"User"> | Date | string
    optional_display_name?: StringNullableFilter<"User"> | string | null
    participant_sessions?: ParticipantSessionListRelationFilter
  }, "id">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    created_at?: SortOrder
    last_seen?: SortOrder
    optional_display_name?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"User"> | string
    created_at?: DateTimeWithAggregatesFilter<"User"> | Date | string
    last_seen?: DateTimeWithAggregatesFilter<"User"> | Date | string
    optional_display_name?: StringNullableWithAggregatesFilter<"User"> | string | null
  }

  export type RoomWhereInput = {
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    id?: UuidFilter<"Room"> | string
    room_code?: StringFilter<"Room"> | string
    host_user_id?: UuidFilter<"Room"> | string
    created_at?: DateTimeFilter<"Room"> | Date | string
    is_active?: BoolFilter<"Room"> | boolean
    max_participants?: IntFilter<"Room"> | number
    participant_sessions?: ParticipantSessionListRelationFilter
  }

  export type RoomOrderByWithRelationInput = {
    id?: SortOrder
    room_code?: SortOrder
    host_user_id?: SortOrder
    created_at?: SortOrder
    is_active?: SortOrder
    max_participants?: SortOrder
    participant_sessions?: ParticipantSessionOrderByRelationAggregateInput
  }

  export type RoomWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    room_code?: string
    AND?: RoomWhereInput | RoomWhereInput[]
    OR?: RoomWhereInput[]
    NOT?: RoomWhereInput | RoomWhereInput[]
    host_user_id?: UuidFilter<"Room"> | string
    created_at?: DateTimeFilter<"Room"> | Date | string
    is_active?: BoolFilter<"Room"> | boolean
    max_participants?: IntFilter<"Room"> | number
    participant_sessions?: ParticipantSessionListRelationFilter
  }, "id" | "room_code">

  export type RoomOrderByWithAggregationInput = {
    id?: SortOrder
    room_code?: SortOrder
    host_user_id?: SortOrder
    created_at?: SortOrder
    is_active?: SortOrder
    max_participants?: SortOrder
    _count?: RoomCountOrderByAggregateInput
    _avg?: RoomAvgOrderByAggregateInput
    _max?: RoomMaxOrderByAggregateInput
    _min?: RoomMinOrderByAggregateInput
    _sum?: RoomSumOrderByAggregateInput
  }

  export type RoomScalarWhereWithAggregatesInput = {
    AND?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    OR?: RoomScalarWhereWithAggregatesInput[]
    NOT?: RoomScalarWhereWithAggregatesInput | RoomScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"Room"> | string
    room_code?: StringWithAggregatesFilter<"Room"> | string
    host_user_id?: UuidWithAggregatesFilter<"Room"> | string
    created_at?: DateTimeWithAggregatesFilter<"Room"> | Date | string
    is_active?: BoolWithAggregatesFilter<"Room"> | boolean
    max_participants?: IntWithAggregatesFilter<"Room"> | number
  }

  export type ParticipantSessionWhereInput = {
    AND?: ParticipantSessionWhereInput | ParticipantSessionWhereInput[]
    OR?: ParticipantSessionWhereInput[]
    NOT?: ParticipantSessionWhereInput | ParticipantSessionWhereInput[]
    id?: UuidFilter<"ParticipantSession"> | string
    room_id?: UuidFilter<"ParticipantSession"> | string
    user_id?: UuidFilter<"ParticipantSession"> | string
    socket_id?: StringFilter<"ParticipantSession"> | string
    connection_status?: StringFilter<"ParticipantSession"> | string
    joined_at?: DateTimeFilter<"ParticipantSession"> | Date | string
    left_at?: DateTimeNullableFilter<"ParticipantSession"> | Date | string | null
    room?: XOR<RoomRelationFilter, RoomWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type ParticipantSessionOrderByWithRelationInput = {
    id?: SortOrder
    room_id?: SortOrder
    user_id?: SortOrder
    socket_id?: SortOrder
    connection_status?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrderInput | SortOrder
    room?: RoomOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type ParticipantSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ParticipantSessionWhereInput | ParticipantSessionWhereInput[]
    OR?: ParticipantSessionWhereInput[]
    NOT?: ParticipantSessionWhereInput | ParticipantSessionWhereInput[]
    room_id?: UuidFilter<"ParticipantSession"> | string
    user_id?: UuidFilter<"ParticipantSession"> | string
    socket_id?: StringFilter<"ParticipantSession"> | string
    connection_status?: StringFilter<"ParticipantSession"> | string
    joined_at?: DateTimeFilter<"ParticipantSession"> | Date | string
    left_at?: DateTimeNullableFilter<"ParticipantSession"> | Date | string | null
    room?: XOR<RoomRelationFilter, RoomWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type ParticipantSessionOrderByWithAggregationInput = {
    id?: SortOrder
    room_id?: SortOrder
    user_id?: SortOrder
    socket_id?: SortOrder
    connection_status?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrderInput | SortOrder
    _count?: ParticipantSessionCountOrderByAggregateInput
    _max?: ParticipantSessionMaxOrderByAggregateInput
    _min?: ParticipantSessionMinOrderByAggregateInput
  }

  export type ParticipantSessionScalarWhereWithAggregatesInput = {
    AND?: ParticipantSessionScalarWhereWithAggregatesInput | ParticipantSessionScalarWhereWithAggregatesInput[]
    OR?: ParticipantSessionScalarWhereWithAggregatesInput[]
    NOT?: ParticipantSessionScalarWhereWithAggregatesInput | ParticipantSessionScalarWhereWithAggregatesInput[]
    id?: UuidWithAggregatesFilter<"ParticipantSession"> | string
    room_id?: UuidWithAggregatesFilter<"ParticipantSession"> | string
    user_id?: UuidWithAggregatesFilter<"ParticipantSession"> | string
    socket_id?: StringWithAggregatesFilter<"ParticipantSession"> | string
    connection_status?: StringWithAggregatesFilter<"ParticipantSession"> | string
    joined_at?: DateTimeWithAggregatesFilter<"ParticipantSession"> | Date | string
    left_at?: DateTimeNullableWithAggregatesFilter<"ParticipantSession"> | Date | string | null
  }

  export type UserCreateInput = {
    id?: string
    created_at?: Date | string
    last_seen?: Date | string
    optional_display_name?: string | null
    participant_sessions?: ParticipantSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    created_at?: Date | string
    last_seen?: Date | string
    optional_display_name?: string | null
    participant_sessions?: ParticipantSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
    participant_sessions?: ParticipantSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
    participant_sessions?: ParticipantSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    created_at?: Date | string
    last_seen?: Date | string
    optional_display_name?: string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type RoomCreateInput = {
    id?: string
    room_code: string
    host_user_id: string
    created_at?: Date | string
    is_active?: boolean
    max_participants?: number
    participant_sessions?: ParticipantSessionCreateNestedManyWithoutRoomInput
  }

  export type RoomUncheckedCreateInput = {
    id?: string
    room_code: string
    host_user_id: string
    created_at?: Date | string
    is_active?: boolean
    max_participants?: number
    participant_sessions?: ParticipantSessionUncheckedCreateNestedManyWithoutRoomInput
  }

  export type RoomUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    participant_sessions?: ParticipantSessionUpdateManyWithoutRoomNestedInput
  }

  export type RoomUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
    participant_sessions?: ParticipantSessionUncheckedUpdateManyWithoutRoomNestedInput
  }

  export type RoomCreateManyInput = {
    id?: string
    room_code: string
    host_user_id: string
    created_at?: Date | string
    is_active?: boolean
    max_participants?: number
  }

  export type RoomUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
  }

  export type RoomUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
  }

  export type ParticipantSessionCreateInput = {
    id?: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
    room: RoomCreateNestedOneWithoutParticipant_sessionsInput
    user: UserCreateNestedOneWithoutParticipant_sessionsInput
  }

  export type ParticipantSessionUncheckedCreateInput = {
    id?: string
    room_id: string
    user_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    room?: RoomUpdateOneRequiredWithoutParticipant_sessionsNestedInput
    user?: UserUpdateOneRequiredWithoutParticipant_sessionsNestedInput
  }

  export type ParticipantSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParticipantSessionCreateManyInput = {
    id?: string
    room_id: string
    user_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParticipantSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type ParticipantSessionListRelationFilter = {
    every?: ParticipantSessionWhereInput
    some?: ParticipantSessionWhereInput
    none?: ParticipantSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ParticipantSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    last_seen?: SortOrder
    optional_display_name?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    last_seen?: SortOrder
    optional_display_name?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    created_at?: SortOrder
    last_seen?: SortOrder
    optional_display_name?: SortOrder
  }

  export type UuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type RoomCountOrderByAggregateInput = {
    id?: SortOrder
    room_code?: SortOrder
    host_user_id?: SortOrder
    created_at?: SortOrder
    is_active?: SortOrder
    max_participants?: SortOrder
  }

  export type RoomAvgOrderByAggregateInput = {
    max_participants?: SortOrder
  }

  export type RoomMaxOrderByAggregateInput = {
    id?: SortOrder
    room_code?: SortOrder
    host_user_id?: SortOrder
    created_at?: SortOrder
    is_active?: SortOrder
    max_participants?: SortOrder
  }

  export type RoomMinOrderByAggregateInput = {
    id?: SortOrder
    room_code?: SortOrder
    host_user_id?: SortOrder
    created_at?: SortOrder
    is_active?: SortOrder
    max_participants?: SortOrder
  }

  export type RoomSumOrderByAggregateInput = {
    max_participants?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RoomRelationFilter = {
    is?: RoomWhereInput
    isNot?: RoomWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ParticipantSessionCountOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    user_id?: SortOrder
    socket_id?: SortOrder
    connection_status?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
  }

  export type ParticipantSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    user_id?: SortOrder
    socket_id?: SortOrder
    connection_status?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
  }

  export type ParticipantSessionMinOrderByAggregateInput = {
    id?: SortOrder
    room_id?: SortOrder
    user_id?: SortOrder
    socket_id?: SortOrder
    connection_status?: SortOrder
    joined_at?: SortOrder
    left_at?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ParticipantSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput> | ParticipantSessionCreateWithoutUserInput[] | ParticipantSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutUserInput | ParticipantSessionCreateOrConnectWithoutUserInput[]
    createMany?: ParticipantSessionCreateManyUserInputEnvelope
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
  }

  export type ParticipantSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput> | ParticipantSessionCreateWithoutUserInput[] | ParticipantSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutUserInput | ParticipantSessionCreateOrConnectWithoutUserInput[]
    createMany?: ParticipantSessionCreateManyUserInputEnvelope
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type ParticipantSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput> | ParticipantSessionCreateWithoutUserInput[] | ParticipantSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutUserInput | ParticipantSessionCreateOrConnectWithoutUserInput[]
    upsert?: ParticipantSessionUpsertWithWhereUniqueWithoutUserInput | ParticipantSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ParticipantSessionCreateManyUserInputEnvelope
    set?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    disconnect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    delete?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    update?: ParticipantSessionUpdateWithWhereUniqueWithoutUserInput | ParticipantSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ParticipantSessionUpdateManyWithWhereWithoutUserInput | ParticipantSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
  }

  export type ParticipantSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput> | ParticipantSessionCreateWithoutUserInput[] | ParticipantSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutUserInput | ParticipantSessionCreateOrConnectWithoutUserInput[]
    upsert?: ParticipantSessionUpsertWithWhereUniqueWithoutUserInput | ParticipantSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ParticipantSessionCreateManyUserInputEnvelope
    set?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    disconnect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    delete?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    update?: ParticipantSessionUpdateWithWhereUniqueWithoutUserInput | ParticipantSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ParticipantSessionUpdateManyWithWhereWithoutUserInput | ParticipantSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
  }

  export type ParticipantSessionCreateNestedManyWithoutRoomInput = {
    create?: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput> | ParticipantSessionCreateWithoutRoomInput[] | ParticipantSessionUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutRoomInput | ParticipantSessionCreateOrConnectWithoutRoomInput[]
    createMany?: ParticipantSessionCreateManyRoomInputEnvelope
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
  }

  export type ParticipantSessionUncheckedCreateNestedManyWithoutRoomInput = {
    create?: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput> | ParticipantSessionCreateWithoutRoomInput[] | ParticipantSessionUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutRoomInput | ParticipantSessionCreateOrConnectWithoutRoomInput[]
    createMany?: ParticipantSessionCreateManyRoomInputEnvelope
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ParticipantSessionUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput> | ParticipantSessionCreateWithoutRoomInput[] | ParticipantSessionUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutRoomInput | ParticipantSessionCreateOrConnectWithoutRoomInput[]
    upsert?: ParticipantSessionUpsertWithWhereUniqueWithoutRoomInput | ParticipantSessionUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ParticipantSessionCreateManyRoomInputEnvelope
    set?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    disconnect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    delete?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    update?: ParticipantSessionUpdateWithWhereUniqueWithoutRoomInput | ParticipantSessionUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ParticipantSessionUpdateManyWithWhereWithoutRoomInput | ParticipantSessionUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
  }

  export type ParticipantSessionUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput> | ParticipantSessionCreateWithoutRoomInput[] | ParticipantSessionUncheckedCreateWithoutRoomInput[]
    connectOrCreate?: ParticipantSessionCreateOrConnectWithoutRoomInput | ParticipantSessionCreateOrConnectWithoutRoomInput[]
    upsert?: ParticipantSessionUpsertWithWhereUniqueWithoutRoomInput | ParticipantSessionUpsertWithWhereUniqueWithoutRoomInput[]
    createMany?: ParticipantSessionCreateManyRoomInputEnvelope
    set?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    disconnect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    delete?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    connect?: ParticipantSessionWhereUniqueInput | ParticipantSessionWhereUniqueInput[]
    update?: ParticipantSessionUpdateWithWhereUniqueWithoutRoomInput | ParticipantSessionUpdateWithWhereUniqueWithoutRoomInput[]
    updateMany?: ParticipantSessionUpdateManyWithWhereWithoutRoomInput | ParticipantSessionUpdateManyWithWhereWithoutRoomInput[]
    deleteMany?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
  }

  export type RoomCreateNestedOneWithoutParticipant_sessionsInput = {
    create?: XOR<RoomCreateWithoutParticipant_sessionsInput, RoomUncheckedCreateWithoutParticipant_sessionsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutParticipant_sessionsInput
    connect?: RoomWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutParticipant_sessionsInput = {
    create?: XOR<UserCreateWithoutParticipant_sessionsInput, UserUncheckedCreateWithoutParticipant_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipant_sessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type RoomUpdateOneRequiredWithoutParticipant_sessionsNestedInput = {
    create?: XOR<RoomCreateWithoutParticipant_sessionsInput, RoomUncheckedCreateWithoutParticipant_sessionsInput>
    connectOrCreate?: RoomCreateOrConnectWithoutParticipant_sessionsInput
    upsert?: RoomUpsertWithoutParticipant_sessionsInput
    connect?: RoomWhereUniqueInput
    update?: XOR<XOR<RoomUpdateToOneWithWhereWithoutParticipant_sessionsInput, RoomUpdateWithoutParticipant_sessionsInput>, RoomUncheckedUpdateWithoutParticipant_sessionsInput>
  }

  export type UserUpdateOneRequiredWithoutParticipant_sessionsNestedInput = {
    create?: XOR<UserCreateWithoutParticipant_sessionsInput, UserUncheckedCreateWithoutParticipant_sessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutParticipant_sessionsInput
    upsert?: UserUpsertWithoutParticipant_sessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutParticipant_sessionsInput, UserUpdateWithoutParticipant_sessionsInput>, UserUncheckedUpdateWithoutParticipant_sessionsInput>
  }

  export type NestedUuidFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidFilter<$PrismaModel> | string
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedUuidWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedUuidWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ParticipantSessionCreateWithoutUserInput = {
    id?: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
    room: RoomCreateNestedOneWithoutParticipant_sessionsInput
  }

  export type ParticipantSessionUncheckedCreateWithoutUserInput = {
    id?: string
    room_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionCreateOrConnectWithoutUserInput = {
    where: ParticipantSessionWhereUniqueInput
    create: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput>
  }

  export type ParticipantSessionCreateManyUserInputEnvelope = {
    data: ParticipantSessionCreateManyUserInput | ParticipantSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ParticipantSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: ParticipantSessionWhereUniqueInput
    update: XOR<ParticipantSessionUpdateWithoutUserInput, ParticipantSessionUncheckedUpdateWithoutUserInput>
    create: XOR<ParticipantSessionCreateWithoutUserInput, ParticipantSessionUncheckedCreateWithoutUserInput>
  }

  export type ParticipantSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: ParticipantSessionWhereUniqueInput
    data: XOR<ParticipantSessionUpdateWithoutUserInput, ParticipantSessionUncheckedUpdateWithoutUserInput>
  }

  export type ParticipantSessionUpdateManyWithWhereWithoutUserInput = {
    where: ParticipantSessionScalarWhereInput
    data: XOR<ParticipantSessionUpdateManyMutationInput, ParticipantSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type ParticipantSessionScalarWhereInput = {
    AND?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
    OR?: ParticipantSessionScalarWhereInput[]
    NOT?: ParticipantSessionScalarWhereInput | ParticipantSessionScalarWhereInput[]
    id?: UuidFilter<"ParticipantSession"> | string
    room_id?: UuidFilter<"ParticipantSession"> | string
    user_id?: UuidFilter<"ParticipantSession"> | string
    socket_id?: StringFilter<"ParticipantSession"> | string
    connection_status?: StringFilter<"ParticipantSession"> | string
    joined_at?: DateTimeFilter<"ParticipantSession"> | Date | string
    left_at?: DateTimeNullableFilter<"ParticipantSession"> | Date | string | null
  }

  export type ParticipantSessionCreateWithoutRoomInput = {
    id?: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
    user: UserCreateNestedOneWithoutParticipant_sessionsInput
  }

  export type ParticipantSessionUncheckedCreateWithoutRoomInput = {
    id?: string
    user_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionCreateOrConnectWithoutRoomInput = {
    where: ParticipantSessionWhereUniqueInput
    create: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput>
  }

  export type ParticipantSessionCreateManyRoomInputEnvelope = {
    data: ParticipantSessionCreateManyRoomInput | ParticipantSessionCreateManyRoomInput[]
    skipDuplicates?: boolean
  }

  export type ParticipantSessionUpsertWithWhereUniqueWithoutRoomInput = {
    where: ParticipantSessionWhereUniqueInput
    update: XOR<ParticipantSessionUpdateWithoutRoomInput, ParticipantSessionUncheckedUpdateWithoutRoomInput>
    create: XOR<ParticipantSessionCreateWithoutRoomInput, ParticipantSessionUncheckedCreateWithoutRoomInput>
  }

  export type ParticipantSessionUpdateWithWhereUniqueWithoutRoomInput = {
    where: ParticipantSessionWhereUniqueInput
    data: XOR<ParticipantSessionUpdateWithoutRoomInput, ParticipantSessionUncheckedUpdateWithoutRoomInput>
  }

  export type ParticipantSessionUpdateManyWithWhereWithoutRoomInput = {
    where: ParticipantSessionScalarWhereInput
    data: XOR<ParticipantSessionUpdateManyMutationInput, ParticipantSessionUncheckedUpdateManyWithoutRoomInput>
  }

  export type RoomCreateWithoutParticipant_sessionsInput = {
    id?: string
    room_code: string
    host_user_id: string
    created_at?: Date | string
    is_active?: boolean
    max_participants?: number
  }

  export type RoomUncheckedCreateWithoutParticipant_sessionsInput = {
    id?: string
    room_code: string
    host_user_id: string
    created_at?: Date | string
    is_active?: boolean
    max_participants?: number
  }

  export type RoomCreateOrConnectWithoutParticipant_sessionsInput = {
    where: RoomWhereUniqueInput
    create: XOR<RoomCreateWithoutParticipant_sessionsInput, RoomUncheckedCreateWithoutParticipant_sessionsInput>
  }

  export type UserCreateWithoutParticipant_sessionsInput = {
    id?: string
    created_at?: Date | string
    last_seen?: Date | string
    optional_display_name?: string | null
  }

  export type UserUncheckedCreateWithoutParticipant_sessionsInput = {
    id?: string
    created_at?: Date | string
    last_seen?: Date | string
    optional_display_name?: string | null
  }

  export type UserCreateOrConnectWithoutParticipant_sessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutParticipant_sessionsInput, UserUncheckedCreateWithoutParticipant_sessionsInput>
  }

  export type RoomUpsertWithoutParticipant_sessionsInput = {
    update: XOR<RoomUpdateWithoutParticipant_sessionsInput, RoomUncheckedUpdateWithoutParticipant_sessionsInput>
    create: XOR<RoomCreateWithoutParticipant_sessionsInput, RoomUncheckedCreateWithoutParticipant_sessionsInput>
    where?: RoomWhereInput
  }

  export type RoomUpdateToOneWithWhereWithoutParticipant_sessionsInput = {
    where?: RoomWhereInput
    data: XOR<RoomUpdateWithoutParticipant_sessionsInput, RoomUncheckedUpdateWithoutParticipant_sessionsInput>
  }

  export type RoomUpdateWithoutParticipant_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
  }

  export type RoomUncheckedUpdateWithoutParticipant_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_code?: StringFieldUpdateOperationsInput | string
    host_user_id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    is_active?: BoolFieldUpdateOperationsInput | boolean
    max_participants?: IntFieldUpdateOperationsInput | number
  }

  export type UserUpsertWithoutParticipant_sessionsInput = {
    update: XOR<UserUpdateWithoutParticipant_sessionsInput, UserUncheckedUpdateWithoutParticipant_sessionsInput>
    create: XOR<UserCreateWithoutParticipant_sessionsInput, UserUncheckedCreateWithoutParticipant_sessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutParticipant_sessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutParticipant_sessionsInput, UserUncheckedUpdateWithoutParticipant_sessionsInput>
  }

  export type UserUpdateWithoutParticipant_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type UserUncheckedUpdateWithoutParticipant_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: DateTimeFieldUpdateOperationsInput | Date | string
    last_seen?: DateTimeFieldUpdateOperationsInput | Date | string
    optional_display_name?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ParticipantSessionCreateManyUserInput = {
    id?: string
    room_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    room?: RoomUpdateOneRequiredWithoutParticipant_sessionsNestedInput
  }

  export type ParticipantSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParticipantSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    room_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParticipantSessionCreateManyRoomInput = {
    id?: string
    user_id: string
    socket_id: string
    connection_status: string
    joined_at?: Date | string
    left_at?: Date | string | null
  }

  export type ParticipantSessionUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: UserUpdateOneRequiredWithoutParticipant_sessionsNestedInput
  }

  export type ParticipantSessionUncheckedUpdateWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ParticipantSessionUncheckedUpdateManyWithoutRoomInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    socket_id?: StringFieldUpdateOperationsInput | string
    connection_status?: StringFieldUpdateOperationsInput | string
    joined_at?: DateTimeFieldUpdateOperationsInput | Date | string
    left_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomCountOutputTypeDefaultArgs instead
     */
    export type RoomCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use RoomDefaultArgs instead
     */
    export type RoomArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = RoomDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ParticipantSessionDefaultArgs instead
     */
    export type ParticipantSessionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ParticipantSessionDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}