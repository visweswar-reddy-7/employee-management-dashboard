// src/constants.js

// Storage keys
export const STORAGE_KEYS = {
  EMPLOYEES: 'employees',
  IS_LOGGED_IN: 'isLoggedIn'
};

// Employee statuses
export const EMPLOYEE_STATUS = {
  ACTIVE: 'Active',
  INACTIVE: 'Inactive'
};

// Genders
export const GENDERS = ['Male', 'Female'];

// States
export const STATES = ['New York', 'California', 'Texas', 'Florida', 'Illinois', 'Pennsylvania', 'Ohio', 'Georgia', 'North Carolina', 'Michigan'];

// Filter options
export const FILTER_OPTIONS = {
  ALL: 'All',
  ALL_GENDERS: 'All Genders',
  ALL_STATUS: 'All Status'
};

// Default credentials
export const DEFAULT_CREDENTIALS = {
  EMAIL: 'admin@example.com',
  PASSWORD: 'password123'
};

  // UI Text Constants
export const UI_TEXT = {
  // Dashboard
  DASHBOARD_TITLE: 'Employee Dashboard',
  TOTAL_EMPLOYEES: 'Total Employees',
  ACTIVE_LABEL: 'Active',
  INACTIVE_LABEL: 'Inactive',
  SEARCH_PLACEHOLDER: 'Search by name...',
  ADD_EMPLOYEE_BUTTON: '+ Add Employee',
  NO_RECORDS_FOUND: 'No records found.',
  DELETE_CONFIRM: 'Delete this record?',
  PRINT_LIST: 'Print List',
  PRINT_EMPLOYEE: 'Print Employee',
  EDIT_EMPLOYEE: 'Edit Employee',
  DELETE_EMPLOYEE: 'Delete Employee',
  ADD_EMPLOYEE_TOOLTIP: 'Add New Employee',
  LOGOUT_TOOLTIP: 'Logout',
  STATUS_TOGGLE: 'Toggle Status',

  // Table Headers
  EMPLOYEE_ID: 'Employee ID',
  PROFILE: 'Profile',
  NAME: 'Name',
  GENDER: 'Gender',
  DOB: 'DOB',
  STATE: 'State',
  STATUS: 'Status',
  ACTIONS: 'Actions',

  // Employee Form
  ADD_EMPLOYEE_TITLE: 'Add Employee',
  EDIT_EMPLOYEE_TITLE: 'Edit Employee',
  FULL_NAME_PLACEHOLDER: 'Full Name',
  SELECT_STATE: 'Select State',
  ACTIVE_STATUS_LABEL: 'Active Status',
  SAVE_EMPLOYEE_BUTTON: 'Save Employee',

  // Login
  STAFF_PORTAL_TITLE: 'Staff Portal',
  LOGIN_DESCRIPTION: 'Please enter your credentials to continue',
  EMAIL_LABEL: 'Email Address',
  PASSWORD_LABEL: 'Password',
  EMAIL_PLACEHOLDER: 'admin@example.com',
  PASSWORD_PLACEHOLDER: '••••••••',
  SIGN_IN_BUTTON: 'Sign In',
  INVALID_CREDENTIALS_ERROR: 'Invalid email or password. Hint: admin@example.com / password123',

  // Logout
  LOGOUT: 'Logout'
};

// Placeholder image
export const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/40';
