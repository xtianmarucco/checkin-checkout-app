import { supabase } from '@/supabaseClient';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
  
    // Buscar al usuario en la tabla `users` por su email
    const { data: user, error } = await supabase
      .from('users')
      .select('id, email, password, role') // Asegurarse de incluir `id` y `role`
      .eq('email', email)
      .single();
  
    if (error || !user) {
      return res.status(401).json({ error: 'User not found or incorrect credentials.' });
    }
  
    if (password !== user.password) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
  
    // Enviar la respuesta con `id`, `email`, y `role`
    res.status(200).json({
      data: { id: user.id, email: user.email, role: user.role },
    });
  }