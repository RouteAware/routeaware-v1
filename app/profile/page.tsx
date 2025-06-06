'use client';

import React from "react";

export default function ProfilePage() {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="bg-yellow-100 text-yellow-800 p-4 rounded mb-4">
        <p>Coming Soon: Profile details, account settings, and load history.</p>
      </div>

      <ul className="list-disc pl-6 text-sm text-gray-700">
        <li>View saved loads and routes</li>
        <li>Update contact and notification preferences</li>
        <li>Manage subscription and billing</li>
        <li>Change password or security settings</li>
        <li>View profile usage and activity logs</li>
      </ul>
    </div>
  );
}