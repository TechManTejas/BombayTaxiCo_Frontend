# Bombay Taxi Company - Frontend

A modern taxi booking application built with React, TypeScript, and Vite. This application provides a seamless booking experience for customers and comprehensive management tools for administrators.

## Features

- **Customer Interface**: Book taxis, view packages, manage bookings
- **Admin Dashboard**: Manage drivers, vehicles, bookings, and routes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Updates**: Live booking status and driver tracking
- **Enhanced Validation**: Comprehensive input validation and sanitization
- **Type Safety**: Fixed booking status enums and improved type definitions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Ant Design
- **Testing**: Vitest + React Testing Library
- **State Management**: React Context API
- **HTTP Client**: Axios

## Getting Started

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
