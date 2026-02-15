import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';
import Sidebar from '../../admin/components/Sidebar';

// Mock antd Layout and Menu
vi.mock('antd', () => ({
  Layout: {
    Sider: ({ children, className }: any) => <div className={className}>{children}</div>,
  },
  Menu: ({ children, defaultSelectedKeys, className, onClick }: any) => (
    <div className={className} data-selected={defaultSelectedKeys[0]}>
      {React.Children.map(children, (child: any) => (
        <div key={child.key} onClick={() => onClick({ key: child.key })}>
          {child}
        </div>
      ))}
    </div>
  ),
  Menu: {
    Item: ({ children, icon, key }: any) => (
      <div data-key={key}>
        {icon && <span data-icon="true">{icon}</span>}
        {children}
      </div>
    ),
  },
}));

// Mock icons
vi.mock('@ant-design/icons', () => ({
  FileOutlined: () => <span data-icon="FileOutlined" />,
  EnvironmentOutlined: () => <span data-icon="EnvironmentOutlined" />,
  CarOutlined: () => <span data-icon="CarOutlined" />,
  TeamOutlined: () => <span data-icon="TeamOutlined" />,
  DollarOutlined: () => <span data-icon="DollarOutlined" />,
  SettingOutlined: () => <span data-icon="SettingOutlined" />,
}));

describe('Sidebar', () => {
  it('should render sidebar with menu items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Bookings')).toBeInTheDocument();
    expect(screen.getByText('Routes')).toBeInTheDocument();
    expect(screen.getByText('Taxis')).toBeInTheDocument();
    expect(screen.getByText('Drivers')).toBeInTheDocument();
    expect(screen.getByText('Coupons')).toBeInTheDocument();
    expect(screen.getByText('Invoices')).toBeInTheDocument();
    expect(screen.getByText('Cities')).toBeInTheDocument();
    expect(screen.getByText('Taxi Types')).toBeInTheDocument();
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('should have proper styling classes', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    
    const sidebar = document.querySelector('.bg-\\[\\#242124\\]');
    expect(sidebar).toBeInTheDocument();
    
    const menu = document.querySelector('.h-full.bg-inherit.text-xl.text-white.space-y-2');
    expect(menu).toBeInTheDocument();
  });

  it('should render icons for menu items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    
    const icons = document.querySelectorAll('[data-icon="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('should have correct data keys for menu items', () => {
    render(
      <MemoryRouter>
        <Sidebar />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Bookings').closest('[data-key="bookings"]')).toBeInTheDocument();
    expect(screen.getByText('Routes').closest('[data-key="routes"]')).toBeInTheDocument();
    expect(screen.getByText('Settings').closest('[data-key="settings"]')).toBeInTheDocument();
  });
});
