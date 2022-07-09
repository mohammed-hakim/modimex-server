"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_GATEWAY = exports.REDIS_OFFERS_PRODS = exports.REDIS_USERS_ORDERS = exports.REDIS_LOCAL = exports.usersDB = exports.statisticsDB = exports.reviewsDB = exports.statsDB = exports.ordersDB = exports.offersDB = exports.productsDB = void 0;
exports.productsDB = {
    type: "postgres",
    database: "tfvvtcci",
    username: "tfvvtcci",
    password: "cMcDeRhQhEP5XTVntlLZxX12o0X3j0xy",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://tfvvtcci:cMcDeRhQhEP5XTVntlLZxX12o0X3j0xy@dumbo.db.elephantsql.com/tfvvtcci",
};
exports.offersDB = {
    type: "postgres",
    database: "jjbqceml",
    username: "jjbqceml",
    password: "kylIABhqxG7gtpeIqbeTzhSKnXvsFSma",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://jjbqceml:kylIABhqxG7gtpeIqbeTzhSKnXvsFSma@dumbo.db.elephantsql.com/jjbqceml",
};
exports.ordersDB = {
    type: "postgres",
    database: "bxehlutv",
    username: "bxehlutv",
    password: "1osrr1gAgPLHtCvAFMbzY_NSUYHsN0zV",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://bxehlutv:1osrr1gAgPLHtCvAFMbzY_NSUYHsN0zV@dumbo.db.elephantsql.com/bxehlutv",
};
exports.statsDB = {
    type: "postgres",
    database: "qvivpgce",
    username: "qvivpgce",
    password: "bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://qvivpgce:bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y@dumbo.db.elephantsql.com/qvivpgce",
};
exports.reviewsDB = {
    type: "postgres",
    database: "qvivpgce",
    username: "qvivpgce",
    password: "bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://qvivpgce:bCBqtJPFD2E7Pa-rxcNI1U7vnlbTjp3y@dumbo.db.elephantsql.com/qvivpgce",
};
exports.statisticsDB = {
    type: "postgres",
    database: "lhmzkjbd",
    username: "lhmzkjbd",
    password: "k0Tbkgrfj6EiKsWE4ZAeYe92nrHyz8r9",
    logging: true,
    synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: true,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://lhmzkjbd:k0Tbkgrfj6EiKsWE4ZAeYe92nrHyz8r9@tai.db.elephantsql.com/lhmzkjbd",
};
exports.usersDB = {
    type: "postgres",
    database: "vicylpxt",
    username: "vicylpxt",
    password: "NbZGjQyjFJPInysSq9JnYewfp4jj3SNr",
    //  logging: true,
    //synchronize: true,
    migrations: ["dist/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_typeorm",
    migrationsRun: false,
    entities: ["dist/**/*.entity.js", "./**/*.entity.js", "./*.entity.js"],
    name: "default",
    url: "postgres://vicylpxt:NbZGjQyjFJPInysSq9JnYewfp4jj3SNr@dumbo.db.elephantsql.com/vicylpxt",
};
exports.REDIS_LOCAL = {
    host: "127.0.0.1",
    port: 6379,
    password: "",
};
exports.REDIS_USERS_ORDERS = {
    host: "127.0.0.1",
    port: 6379,
    password: "",
};
exports.REDIS_OFFERS_PRODS = {
    host: "127.0.0.1",
    port: 6379,
    password: "125",
};
// exports.REDIS_GATEWAY = {
//   host: "redis-11061.c247.eu-west-1-1.ec2.cloud.redislabs.com",
//   port: 11061,
//   password: "glPj3frnONt8Km1Nms0aHRxCr6Ii9KvH",
// };

exports.REDIS_GATEWAY = {
    host: "127.0.0.1",
    port: 6379,
    password: "125",
};


exports.REDIS_GATEWAY = {
    host: "redis-15350.c266.us-east-1-3.ec2.cloud.redislabs.com",
    port: 15350,
    password: "4OQVp506UGvwLVjuQiya8pYpNqFgILv8",
};


///////////////45
exports.DRIVE_SERVER = {

    refresh_token: "1//03UofJTviITcQCgYIARAAGAMSNwF-L9IrZw81Av8AgOCI8VuqxsiQPcYWsnMrWIj0bKxQL1JeiGRTo0vRc3l9o6RqD-cPx8aJYuI",
    folder: "1UUaWTwYOk1js-MraaDJKDZc6Ui3Z_yas",
};


//# sourceMappingURL=index.js.map