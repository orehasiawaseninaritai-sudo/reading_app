export default defineEventHandler(async (event) => {
    const [rows] = await pool.query('SELECT * FROM books');
    return rows;
});