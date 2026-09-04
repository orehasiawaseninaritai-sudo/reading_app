export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await pool.query('INSERT INTO books (title, author, status, rating, comment) VALUES (?, ?, ?, ?, ?)', [body.title, body.author, body.status, body.rating, body.comment]);
    return { ok: true };
});