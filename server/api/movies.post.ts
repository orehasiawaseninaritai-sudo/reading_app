export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    await pool.query('INSERT INTO movies (title, director, status, rating, comment) VALUES (?, ?, ?, ?, ?)', [body.title, body.director, body.status, body.rating, body.comment]);
    return { ok: true };
});