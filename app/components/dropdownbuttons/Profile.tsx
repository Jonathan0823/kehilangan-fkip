"use client"
import { useRouter } from 'next/navigation';
import React from 'react'

const ProfileButton = () => {
    const router = useRouter();

    const handleProfile = () => {
        router.push('/profile');
    }
  return (
    <span onClick={handleProfile}>My Account</span>
  )
}

export default ProfileButton