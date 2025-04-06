import { ReactNode } from 'react';
import AdminNavbar from './AdminNavbar';

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavbar />
      <main className="py-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
