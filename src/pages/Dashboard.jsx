import React, { useState, useEffect } from 'react';
import { Plus, Search, Printer, Edit, Trash2, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import EmployeeForm from '../components/EmployeeForm';
import { STORAGE_KEYS, EMPLOYEE_STATUS, FILTER_OPTIONS, UI_TEXT, PLACEHOLDER_IMAGE } from '../constants';

export default function Dashboard() {
  const { logout } = useAuth();
  const [employees, setEmployees] = useState(JSON.parse(localStorage.getItem(STORAGE_KEYS.EMPLOYEES) || '[]'));
  const [isFormOpen, setFormOpen] = useState(false);
  const [editingEmp, setEditingEmp] = useState(null);
  const [search, setSearch] = useState('');
  const [filterGender, setFilterGender] = useState(FILTER_OPTIONS.ALL);
  const [filterStatus, setFilterStatus] = useState(FILTER_OPTIONS.ALL);

  useEffect(() => localStorage.setItem(STORAGE_KEYS.EMPLOYEES, JSON.stringify(employees)), [employees]);

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) &&
    (filterGender === FILTER_OPTIONS.ALL || e.gender === filterGender) &&
    (filterStatus === FILTER_OPTIONS.ALL || e.status === filterStatus)
  );

  const handleDelete = (id) => { if(window.confirm(UI_TEXT.DELETE_CONFIRM)) setEmployees(employees.filter(e => e.id !== id)); };

  return (
    <div className="min-h-screen p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8 no-print">
        <h1 className="text-3xl font-bold text-slate-800">{UI_TEXT.DASHBOARD_TITLE}</h1>
        <button onClick={logout} className="flex items-center gap-2 text-slate-500 hover:text-red-600 font-medium transition"><LogOut size={18}/>{UI_TEXT.LOGOUT}</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 no-print">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-blue-500">
          <p className="text-slate-500">{UI_TEXT.TOTAL_EMPLOYEES}</p>
          <p className="text-3xl font-bold">{employees.length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-green-500">
          <p className="text-green-600 font-medium">{UI_TEXT.ACTIVE_LABEL}</p>
          <p className="text-3xl font-bold">{employees.filter(e => e.status === EMPLOYEE_STATUS.ACTIVE).length}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-l-4 border-l-red-500">
          <p className="text-red-600 font-medium">{UI_TEXT.INACTIVE_LABEL}</p>
          <p className="text-3xl font-bold">{employees.filter(e => e.status === EMPLOYEE_STATUS.INACTIVE).length}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mb-6 no-print">
        <div className="relative flex-1 min-w-[280px]">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input type="text" placeholder={UI_TEXT.SEARCH_PLACEHOLDER} className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-brand" onChange={e => setSearch(e.target.value)} />
        </div>
        <select className="border rounded-xl px-4 py-2 bg-white" onChange={e => setFilterGender(e.target.value)}>
          <option value={FILTER_OPTIONS.ALL}>{FILTER_OPTIONS.ALL_GENDERS}</option><option>Male</option><option>Female</option>
        </select>
        <select className="border rounded-xl px-4 py-2 bg-white" onChange={e => setFilterStatus(e.target.value)}>
          <option value={FILTER_OPTIONS.ALL}>{FILTER_OPTIONS.ALL_STATUS}</option><option>Active</option><option>Inactive</option>
        </select>
        <button title={UI_TEXT.PRINT_LIST} aria-label={UI_TEXT.PRINT_LIST} onClick={() => window.print()} className="bg-white border px-4 py-2 rounded-xl hover:bg-slate-50"><Printer size={20}/></button>
        <button onClick={() => { setEditingEmp(null); setFormOpen(true); }} className="bg-brand text-white px-6 py-2 rounded-xl font-bold hover:bg-blue-700 shadow-lg">{UI_TEXT.ADD_EMPLOYEE_BUTTON}</button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden print-area">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b">
            <tr>
              <th className="p-4">{UI_TEXT.EMPLOYEE_ID}</th><th className="p-4">{UI_TEXT.PROFILE}</th><th className="p-4">{UI_TEXT.NAME}</th><th className="p-4">{UI_TEXT.GENDER}</th><th className="p-4">{UI_TEXT.DOB}</th><th className="p-4">{UI_TEXT.STATE}</th><th className="p-4">{UI_TEXT.STATUS}</th><th className="p-4 text-right no-print">{UI_TEXT.ACTIONS}</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filtered.map(emp => (
              <tr key={emp.id} className="hover:bg-slate-50 transition">
                <td className="p-4 font-mono text-sm">{emp.id}</td>
                <td className="p-4"><img src={emp.image || PLACEHOLDER_IMAGE} className="w-10 h-10 rounded-full border object-cover" /></td>
                <td className="p-4 font-medium">{emp.name}</td>
                <td className="p-4">{emp.gender}</td>
                <td className="p-4">{emp.dob}</td>
                <td className="p-4">{emp.state}</td>
                <td className="p-4">
                  <label className="inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={emp.status === EMPLOYEE_STATUS.ACTIVE} onChange={() => {
                      const newStatus = emp.status === EMPLOYEE_STATUS.ACTIVE ? EMPLOYEE_STATUS.INACTIVE : EMPLOYEE_STATUS.ACTIVE;
                      setEmployees(employees.map(e => e.id === emp.id ? { ...e, status: newStatus } : e));
                    }} className="sr-only peer" />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </td>
                <td className="p-4 text-right no-print">
                  <button onClick={() => {
                    const printWindow = window.open('', '_blank');
                    printWindow.document.write(`<html><head><title>Print Employee</title><style>body{font-family:Arial,sans-serif;margin:20px;} img{border-radius:50%;}</style></head><body><h1>${emp.name}</h1><p><strong>ID:</strong> ${emp.id}</p><p><strong>Gender:</strong> ${emp.gender}</p><p><strong>DOB:</strong> ${emp.dob}</p><p><strong>State:</strong> ${emp.state}</p><p><strong>Status:</strong> ${emp.status}</p><img src='${emp.image || PLACEHOLDER_IMAGE}' style='width:100px;height:100px;object-fit:cover;border-radius:50%;'/></body></html>`);
                    printWindow.document.close();
                    printWindow.print();
                  }} className="text-gray-600 mr-3"><Printer size={18}/></button>
                  <button onClick={() => { setEditingEmp(emp); setFormOpen(true); }} className="text-brand mr-3"><Edit size={18}/></button>
                  <button onClick={() => handleDelete(emp.id)} className="text-red-600"><Trash2 size={18}/></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <div className="p-20 text-center text-slate-400 font-medium">{UI_TEXT.NO_RECORDS_FOUND}</div>}
      </div>

      {isFormOpen && (
        <EmployeeForm 
          employee={editingEmp} 
          onClose={() => setFormOpen(false)} 
          onSave={(data) => {
            if (editingEmp) setEmployees(employees.map(e => e.id === editingEmp.id ? data : e));
            else setEmployees([...employees, data]);
            setFormOpen(false);
          }} 
        />
      )}
    </div>
  );
}
