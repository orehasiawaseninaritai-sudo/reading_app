export default defineEventHandler(async (event) => {
    const id = getRouterParam(event, 'id');
    await pool.query('DELETE FROM movies WHERE id = ?', [id]);
    return { ok: true };
});