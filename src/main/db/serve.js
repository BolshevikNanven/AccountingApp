
export class BillDbServe {
    #db;
    constructor(db) {
        this.#db = db;
    }
    getAll() {
        const sql = `SELECT * FROM bill ORDER BY datetime DESC`;
        return this.#db.select(sql)
    }
    add(bill) {
        const sql = `
            INSERT INTO bill VALUES(
                '${bill.id}','${bill.datetime}','${bill.big_type}','${bill.type}','${bill.count}','${bill.ledger}',
                '${bill.note}','${bill.options}',''
            )`;
        this.#db.run(sql);
    }
    edit(bill) {
        const sql = `
        UPDATE bill SET 
            datetime='${bill.datetime}',big_type='${bill.big_type}',type='${bill.type}',count='${bill.count}',
            ledger='${bill.ledger}',note='${bill.note}',options='${bill.options}' WHERE id='${bill.id}'
        `;
        this.#db.run(sql);
    }
    delete(id) {
        const sql = `DELETE FROM bill WHERE id='${id}'`;

        this.#db.run(sql);
    }
}