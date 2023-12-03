import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'

import dayjs from 'dayjs';

export class SqlDatabase {
    #db;
    constructor(url) {
        if (!fs.existsSync(url)) {
            fs.mkdirSync(url)
        }

        this.#db = new Database(path.join(url, 'data.db'), { verbose: console.log });

        const db_version = this.#db.pragma('user_version', { simple: true });
        if (db_version === 0) {
            //初次使用创建表
            const nowDate = dayjs().format('YYYY-MM-DD HH:mm')
            this.#db.exec(`
            PRAGMA foreign_keys = false;

            -- ----------------------------
            -- Table structure for bill
            -- ----------------------------
            CREATE TABLE "bill" (
              "id" text NOT NULL,
              "datetime" text,
              "big_type" TEXT,
              "type" TEXT,
              "count" INTEGER,
              "note" TEXT,
              "options" TEXT NOT NULL ON CONFLICT REPLACE DEFAULT [],
              "ledger_id" text,
              PRIMARY KEY ("id")
            );
            
            -- ----------------------------
            -- Table structure for ledger
            -- ----------------------------
            CREATE TABLE "ledger" (
              "id" text NOT NULL,
              "create_time" text,
              "update_time" text,
              "name" TEXT,
              "color" TEXT,
              "note" TEXT,
              PRIMARY KEY ("id")
            );

            INSERT INTO "ledger" VALUES ('1', '${nowDate}', '${nowDate}', '默认账本', '#fecaca', '');
            
            PRAGMA foreign_keys = true;
            `);
            this.#db.pragma("user_version = 1");
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