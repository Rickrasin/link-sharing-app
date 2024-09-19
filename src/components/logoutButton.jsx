// components/LogoutButton.jsx
"use client"; // Isso marca o componente como Client Component
import { signOut } from "@/actions/auth/auth";

export default function LogoutButton() {
  return <button onClick={() => signOut()}>Disconnect</button>;
}
