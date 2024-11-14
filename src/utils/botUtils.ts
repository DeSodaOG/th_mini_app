import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.VITE_POSTGRES_URL,
})

export async function clickNewUser(uid: string, newTime: string, inviteID: string) {
    try {
        pool.connect((err) => {
            if (err) throw err
            console.log("Connect to PostgreSQL successfully!")
        })
        const { rows } = await pool.query('INSERT INTO click_user(uid, clickTime, inviteID) VALUES($1, $2, $3) RETURNING *', [uid, newTime, inviteID]);
        console.log(rows)
    } catch (err) {
        console.log(err);
    }
}