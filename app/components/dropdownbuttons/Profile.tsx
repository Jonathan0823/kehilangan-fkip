"use client";
import Link from "next/link";
import React from "react";

const ProfileButton = () => {
  return (
    <Link href="/profile">
      <span>My Account</span>
    </Link>
  );
};

export default ProfileButton;
