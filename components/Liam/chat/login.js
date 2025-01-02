// src/components/LoginRequired.js
import Link from 'next/link';

export default function LoginRequired() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="text-center p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          請先登入
        </h2>
        <p className="text-gray-600 mb-6">
          您需要登入才能使用聊天功能
        </p>
        <Link 
          href="/login" 
          className="inline-block px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          前往登入
        </Link>
      </div>
    </div>
  );
}