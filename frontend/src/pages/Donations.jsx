// src/pages/Donations.jsx
import { useState, useEffect, useContext } from 'react';
import client from '../apiServices/api.js';
import AuthContext from "../context/AuthContext";
import SidebarComponent from "../components/SidebarComponent.jsx";

const Donations = () => {
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Get user data from your auth context
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && user.id) {
      fetchDonations();
      fetchStats();
    }
  }, [user]);

  useEffect(() => {
    filterDonations();
  }, [donations, selectedFilter]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      let endpoint = '';
      
      // Determine endpoint based on user role
      // Note: Adjust these API endpoints based on your backend
      if (user.role === 'SELLER') {
        endpoint = `/donations/seller/${user.id}`;
      } else if (user.role === 'BUYER') {
        endpoint = `/donations/buyer/${user.id}`;
      } else {
        // Admin or other roles
        endpoint = '/donations';
      }
      
      const response = await client.get(endpoint);
      setDonations(response.data);
    } catch (err) {
      setError('Failed to fetch donations: ' + (err.response?.data?.message || err.message));
      console.error('Error fetching donations:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      let totalEndpoint = '';
      
      if (user.role === 'SELLER') {
        totalEndpoint = `/donations/total/seller/${user.id}`;
      } else if (user.role === 'BUYER') {
        totalEndpoint = `/donations/total/buyer/${user.id}`;
      } else {
        totalEndpoint = '/donations/total';
      }
      
      const [totalRes, pendingRes] = await Promise.all([
        client.get(totalEndpoint),
        client.get('/donations/total/pending')
      ]);
      
      setStats({
        total: totalRes.data,
        pending: pendingRes.data,
        completed: totalRes.data - pendingRes.data
      });
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const filterDonations = () => {
    if (selectedFilter === 'all') {
      setFilteredDonations(donations);
    } else {
      setFilteredDonations(donations.filter(d => d.status === selectedFilter.toUpperCase()));
    }
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const markAsTransferred = async (donationId) => {
    try {
      await client.patch(`/donations/${donationId}/transfer`);
      // Refresh donations list
      fetchDonations();
      fetchStats();
    } catch (err) {
      setError('Failed to update donation: ' + (err.response?.data?.message || err.message));
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ar-EG', {
      style: 'currency',
      currency: 'EGP'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'FAILED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case 'COMPLETED':
        return 'مكتمل';
      case 'PENDING':
        return 'قيد الانتظار';
      case 'FAILED':
        return 'فاشل';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex" dir="rtl">
        <SidebarComponent />
        <div className="flex-1 mr-64 p-8 flex justify-center items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex" dir="rtl">
        <SidebarComponent />
        <div className="flex-1 mr-64 p-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">خطأ! </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex" dir="rtl">
      <SidebarComponent />
      
      {/* Main Content */}
      <main className="flex-1 mr-64 p-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">تبرعاتي</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            تتبع تبرعاتك وتأثيرها في دعم أهالي غزة. كل تبرع يساهم في صنع فرق حقيقي.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-brand mb-2">{formatCurrency(stats.total)}</div>
            <div className="text-gray-600">إجمالي التبرعات</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-yellow-600 mb-2">{formatCurrency(stats.pending)}</div>
            <div className="text-gray-600">تبرعات قيد الانتظار</div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-2">{formatCurrency(stats.completed)}</div>
            <div className="text-gray-600">تبرعات مكتملة</div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              className={`px-4 py-2 rounded-full ${selectedFilter === 'all' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleFilterChange('all')}
            >
              الكل
            </button>
            <button
              className={`px-4 py-2 rounded-full ${selectedFilter === 'completed' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleFilterChange('completed')}
            >
              مكتمل
            </button>
            <button
              className={`px-4 py-2 rounded-full ${selectedFilter === 'pending' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleFilterChange('pending')}
            >
              قيد الانتظار
            </button>
            <button
              className={`px-4 py-2 rounded-full ${selectedFilter === 'failed' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
              onClick={() => handleFilterChange('failed')}
            >
              فاشل
            </button>
          </div>
        </div>

        {/* Donations Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم التبرع
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    التاريخ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    المبلغ
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    الحالة
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    رقم الطلب
                  </th>
                  {user.role === 'SELLER' && (
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      الإجراءات
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDonations.length > 0 ? (
                  filteredDonations.map((donation) => (
                    <tr key={donation.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        #{donation.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(donation.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatCurrency(donation.amount)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(donation.status)}`}>
                          {translateStatus(donation.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        #{donation.order?.id || 'N/A'}
                      </td>
                      {user.role === 'SELLER' && (
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {donation.status === 'PENDING' && (
                            <button 
                              className="text-blue-600 hover:text-blue-900"
                              onClick={() => markAsTransferred(donation.id)}
                            >
                              تحويل
                            </button>
                          )}
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={user.role === 'SELLER' ? 6 : 5} className="px-6 py-4 text-center text-sm text-gray-500">
                      لا توجد تبرعات لعرضها
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Impact Section */}
        <div className="bg-gradient-to-r from-brand to-green-700 rounded-lg shadow-md p-8 mt-12 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">تأثير تبرعاتك</h2>
          <p className="mb-6">
            بفضل تبرعاتك السخية، استطعنا تقديم المساعدة للعديد من العائلات في غزة.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-2xl font-bold">٥٠٠+</div>
              <div className="text-sm">عائلة مستفيدة</div>
            </div>
            <div>
              <div className="text-2xl font-bold">١٬٢٠٠+</div>
              <div className="text-sm">وجبة طعام</div>
            </div>
            <div>
              <div className="text-2xl font-bold">٣٥٠+</div>
              <div className="text-sm">طفل يحصلون على التعليم</div>
            </div>
            <div>
              <div className="text-2xl font-bold">٢٥٠+</div>
              <div className="text-sm">حالة طبية تم علاجها</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Donations;