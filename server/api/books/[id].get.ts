import type { RowDataPacket } from 'mysql2';


export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM books WHERE id = ?', [id]);
    if (!rows[0]) {
        throw createError({
            statusCode: 404,
            statusMessage: 'Book not found',
        });
    }
    return rows[0];
});