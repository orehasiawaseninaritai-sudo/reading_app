export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    await pool.query('DELETE FROM books WHERE id = ?', [id]);
    return { ok: true };
});