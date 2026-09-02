import type { RowDataPacket } from 'mysql2';


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM movies WHERE id = ?', [id]);
    return rows[0];
});