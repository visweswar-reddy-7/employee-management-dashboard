import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { EMPLOYEE_STATUS, GENDERS, STATES, UI_TEXT } from '../constants';

// Generate unique ID for new employees
const generateEmployeeId = () => {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}-${String(date.getHours()).padStart(2, '0')}${String(date.getMinutes()).padStart(2, '0')}${String(date.getSeconds()).padStart(2, '0')}`;
  const randomPart = Math.random().toString(36).slice(2, 7);
  return `EMP${formattedDate}-${randomPart}`;
};

export default function EmployeeForm({ employee, onSave, onClose }) {
  const [form, setForm] = useState(() => ({
    id: employee?.id || generateEmployeeId(),
    name: employee?.name || '',
    gender: employee?.gender || GENDERS[0],
    dob: employee?.dob || '',
    state: employee?.state || '',
    status: employee?.status || EMPLOYEE_STATUS.ACTIVE,
    image: employee?.image || null,
  }));

  const [error, setError] = useState('');

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setForm({ ...form, image: reader.result });
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{employee ? UI_TEXT.EDIT_EMPLOYEE_TITLE : UI_TEXT.ADD_EMPLOYEE_TITLE}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full" title="Close the employee form"><X size={20}/></button>
        </div>
        <form onSubmit={(e) => {
          e.preventDefault();
          const currentDate = new Date();
          const minDob = new Date(currentDate.getFullYear() - 18, currentDate.getMonth(), currentDate.getDate());
          const dobDate = new Date(form.dob);
          if (dobDate > minDob) {
            setError('Employee must be at least 18 years old.');
            return;
          }
          setError('');
          onSave(form);
        }} className="p-6 space-y-4">
          <div className="flex justify-center">
            <div className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-300 flex items-center justify-center bg-slate-50 overflow-hidden">
              {form.image ? <img src={form.image} className="w-full h-full object-cover" /> : <Upload className="text-slate-300" />}
              <input type="file" accept="image/*" onChange={handleImage} className="absolute inset-0 opacity-0 cursor-pointer" title="Click to upload employee photo" />
            </div>
          </div>
          <input required placeholder={UI_TEXT.FULL_NAME_PLACEHOLDER} className="w-full border p-3 rounded-xl outline-none focus:ring-2 focus:ring-brand"
            value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          <div className="grid grid-cols-2 gap-4">
            <select className="border p-3 rounded-xl" value={form.gender} onChange={e => setForm({...form, gender: e.target.value})}>{GENDERS.map(g => <option key={g}>{g}</option>)}</select>
            <input required type="date" className="border p-3 rounded-xl" value={form.dob} onChange={e => setForm({...form, dob: e.target.value})} />
          </div>
          <select required className="w-full border p-3 rounded-xl" value={form.state} onChange={e => setForm({...form, state: e.target.value})}>
            <option value="">{UI_TEXT.SELECT_STATE}</option>{STATES.map(s => <option key={s}>{s}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="active" className="w-5 h-5" checked={form.status === EMPLOYEE_STATUS.ACTIVE} onChange={e => setForm({...form, status: e.target.checked ? EMPLOYEE_STATUS.ACTIVE : EMPLOYEE_STATUS.INACTIVE})} />
            <label htmlFor="active" className="text-sm font-medium">{UI_TEXT.ACTIVE_STATUS_LABEL}</label>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-brand text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition">{UI_TEXT.SAVE_EMPLOYEE_BUTTON}</button>
        </form>
      </div>
    </div>
  );
}
