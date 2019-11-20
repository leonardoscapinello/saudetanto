export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // DISCARD FIRST (O) POSITION, BY PASSING COMMA
  const [, token] = authHeader.split(' ');

  if (token === 'a197994c-78fc-46ce-a3c3-df87a0355505') return next();

  return res.status(401).json({ error: 'Unauthorized User' });
};
