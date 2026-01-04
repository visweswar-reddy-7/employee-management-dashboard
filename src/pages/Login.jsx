import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ShieldCheck } from 'lucide-react';
import { DEFAULT_CREDENTIALS, UI_TEXT } from '../constants';

const Login = () => {
  const [email, setEmail] = useState(DEFAULT_CREDENTIALS.EMAIL);
  const [password, setPassword] = useState(DEFAULT_CREDENTIALS.PASSWORD);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (login(email, password)) {
      navigate('/dashboard');
    } else {
      setError(UI_TEXT.INVALID_CREDENTIALS_ERROR);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-blue-600 mb-4">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">{UI_TEXT.STAFF_PORTAL_TITLE}</h1>
          <p className="text-slate-500 text-sm mt-1">{UI_TEXT.LOGIN_DESCRIPTION}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="email-input" className="block text-sm font-semibold text-slate-700 mb-1">{UI_TEXT.EMAIL_LABEL}</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                id="email-input"
                type="email"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder={UI_TEXT.EMAIL_PLACEHOLDER}
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label htmlFor="password-input" className="block text-sm font-semibold text-slate-700 mb-1">{UI_TEXT.PASSWORD_LABEL}</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
              <input
                id="password-input"
                type="password"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                placeholder={UI_TEXT.PASSWORD_PLACEHOLDER}
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-xs font-medium">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition active:scale-[0.98]"
          >
            {UI_TEXT.SIGN_IN_BUTTON}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
