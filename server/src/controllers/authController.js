import { authService } from '../services/authService.js';

export const authController = {
  login: async (req, res, next) => {
    try {
      const email = typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : '';
      const password = typeof req.body.password === 'string' ? req.body.password : '';

      if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
      }

      const result = await authService.login(email, password);

      // Set HTTP-only secure cookie
      res.cookie('admin_token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
      });

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  logout: async (req, res) => {
    res.clearCookie('admin_token');
    res.json({ success: true, message: 'Logged out successfully.' });
  },

  me: async (req, res) => {
    res.json({ success: true, data: { user: req.user } });
  }
};
