"use client"
import { signOut } from 'next-auth/react'
import React from 'react'

const Logout = () => {

    const handleLogOut = () => {
        signOut();
    }
  return (
    <span onClick={handleLogOut}>Log out</span>
  )
}

export default Logout