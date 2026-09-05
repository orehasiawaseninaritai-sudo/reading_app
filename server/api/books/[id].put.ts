export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    const body = await readBody(event);
    await pool.query('UPDATE books SET status = ?, rating = ?, comment = ? WHERE id = ?', [body.status, body.rating, body.comment, id]);
    return { ok: true };
});