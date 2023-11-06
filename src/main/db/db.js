import Database from 'better-sqlite3'

export class SqlDatabase {
    #db;
    constructor(url) {
        this.#db = new Database(url, { verbose: console.log });

        const db_version = this.#db.pragma('user_version', { simple: true });
        if (db_version === 0) {
            //初次使用创建表
            this.#db.exec(`
                
            `);
            //this.#db.pragma("user_version = 1");
        }
    }

    select(sql) {
        const command = this.#db.prepare(sql);
        const result = command.all();

        return result;
    }
    run(sql) {
        this.#db.exec(sql)
    }

}