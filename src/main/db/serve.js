import path from "path";
import fs from "fs";

import { app } from 'electron'
import dayjs from "dayjs";

export class BillDbServe {
    #db;
    constructor(db) {
        this.#db = db;
    }
    getAll() {
        const sql = `SELECT * FROM bill ORDER BY datetime DESC`;
        return this.#db.select(sql)
    }
    getByLedger(id) {
        const sql = `SELECT * FROM bill WHERE ledger_id ='${id}' ORDER BY datetime DESC`;
        return this.#db.select(sql)
    }
    add(bill) {
        const sql = `
            INSERT OR REPLACE INTO bill VALUES(
                '${bill.id}','${bill.datetime}','${bill.big_type}','${bill.type}','${bill.count}',
                '${bill.note}','${bill.options}','${bill.ledger_id}'
            )`;
        const sql2 = `UPDATE ledger SET update_time='${bill.nowtime}' WHERE id='${bill.ledger_id}'`

        this.#db.run(sql);
        this.#db.run(sql2);
    }
    edit(bill) {
        const sql = `
        UPDATE bill SET 
            datetime='${bill.datetime}',big_type='${bill.big_type}',type='${bill.type}',count='${bill.count}',
            ,note='${bill.note}',options='${bill.options}',ledger_id='${bill.ledger_id}' WHERE id='${bill.id}'
        `;
        this.#db.run(sql);
    }
    delete(id) {
        const sql = `DELETE FROM bill WHERE id='${id}'`;

        this.#db.run(sql);
    }
}

export class LedgerDbServe {
    #db;
    constructor(db) {
        this.#db = db;
    }
    getAll() {
        const sql = `SELECT * FROM ledger`;
        return this.#db.select(sql)
    }
    add(ledger) {
        const sql = `
            INSERT INTO ledger VALUES(
                '${ledger.id}','${ledger.create_time}','${ledger.update_time}','${ledger.name}','${ledger.color}','${ledger.note}'
            )`;
        this.#db.run(sql);
    }
    edit(ledger) {
        const sql = `
        UPDATE ledger SET 
            create_time='${ledger.create_time}',update_time='${ledger.update_time}',name='${ledger.name}',color='${ledger.color}',note='${ledger.note}'
             WHERE id='${ledger.id}'
        `;
        this.#db.run(sql);
    }
    delete(id) {
        const sql = `DELETE FROM ledger WHERE id='${id}'`;
        const sql2 = `DELETE FROM bill WHERE ledger_id='${id}'`

        this.#db.run(sql);
        this.#db.run(sql2);
    }
}

export class UserFileServe {
    static get() {
        const filePath = path.resolve('userstate.dat');

        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, '{"theme":"light"}')
        }

        return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
    static set(payload) {
        const filePath = path.resolve('userstate.dat');

        fs.writeFile(filePath, JSON.stringify(payload), (err) => console.log(err))
    }
}
export class DataFileServe {
    static exportData(data, pattern, name) {
        const transformToCsv = (arr) => {
            let csvString = ''

            arr.forEach((value) => {
                value = value.toString()

                if (value.includes(',')) {
                    csvString += ',"' + value + '"'
                } else {
                    csvString += ',' + value
                }
            })

            return csvString.substring(1) + '\r\n'
        }

        switch (pattern) {
            case 'csv': {
                let SET = transformToCsv(Object.keys(data[0]))
                const pathname = path.join(app.getPath('downloads'), `${name}.${pattern}`)

                return new Promise((resolve, reject) => {
                    if (fs.existsSync(pathname)) {
                        fs.rmSync(pathname)
                    }

                    fs.appendFileSync(pathname, SET, (err) => err && reject(err))
                    data.forEach((values) => {
                        const csvString = transformToCsv(Object.values(values))

                        fs.appendFile(pathname, csvString, 'utf-8', (err) => err && reject(err))

                    })

                    resolve(pathname)

                })
            }
        }

    }
    static getDatabase(pathname) {
        return fs.statSync(pathname).size
    }
}