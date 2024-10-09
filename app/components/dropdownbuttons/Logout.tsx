"use client"
import { signOut } from 'next-auth/react'
import React, { useState } from 'react'

const Logout = () => {
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    setLoading(true);
    try {
      await signOut();
    } catch (error) {
      console.error("Error during sign out:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <span onClick={handleLogOut}>
      {loading ? 'Logging out...' : 'Log out'}
    </span>
  )
}

export default Logout