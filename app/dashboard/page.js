'use client';

import { useState, useEffect } from "react";
import { supabase } from '@/supabaseClient';


export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      fetchUsers();
    }, []);
  
    async function fetchUsers() {
      setLoading(true);
  
      // Trae los datos de la tabla 'users' en Supabase
      const { data, error } = await supabase
        .from('users')  // Asegúrate de que el nombre coincida con tu tabla en Supabase
        .select('*');
  
      if (error) {
        console.error('Error fetching users:', error);
      } else {
        setUsers(data);
      }
      setLoading(false);
    }
  
    return (
      <div>
        <h1>Users List</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {users.length > 0 ? (
              users.map((user) => (
                <li key={user.id}>
                  <p><strong>Name:</strong> {user.username} {user.lastname}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                </li>
              ))
            ) : (
              <p>No users found.</p>
            )}
          </ul>
        )}
      </div>
    
  );
}
