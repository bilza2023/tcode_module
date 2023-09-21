
function uuid() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let uniqueId = '';
  for (let i = 0; i < 32; i++) {
    uniqueId += chars[Math.floor(Math.random() * chars.length)];
  }
  return uniqueId;
}
module.exports = uuid;