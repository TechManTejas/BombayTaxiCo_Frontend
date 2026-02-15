import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AddEditFrom from '../../admin/components/AddEditFrom';

// Mock antd Modal
vi.mock('antd', () => ({
  Card: ({ children, title }: any) => <div data-testid="card"><div data-testid="card-title">{title}</div>{children}</div>,
  Form: {
    Item: ({ children, label }: any) => <div><label>{label}</label>{children}</div>,
    useForm: () => ({
      setFieldsValue: vi.fn(),
      validateFields: vi.fn(),
      resetFields: vi.fn(),
    }),
  },
  Input: ({ placeholder, value, onChange }: any) => (
    <input placeholder={placeholder} value={value} onChange={onChange} data-testid="input" />
  ),
  'Input.TextArea': ({ placeholder, value, onChange }: any) => (
    <textarea placeholder={placeholder} value={value} onChange={onChange} data-testid="textarea" />
  ),
  Button: ({ children, onClick, htmlType }: any) => (
    <button onClick={onClick} type={htmlType} data-testid="button">{children}</button>
  ),
}));

describe('AddEditFrom', () => {
  it('should render form with correct title', () => {
    render(<AddEditFrom />);
    
    expect(screen.getByTestId('card-title')).toHaveTextContent('Add/Edit Location (From)');
  });

  it('should render all form fields', () => {
    render(<AddEditFrom />);
    
    expect(screen.getByLabelText('Location Name')).toBeInTheDocument();
    expect(screen.getByLabelText('Address')).toBeInTheDocument();
    expect(screen.getByLabelText('Phone Number')).toBeInTheDocument();
  });

  it('should render submit button', () => {
    render(<AddEditFrom />);
    
    expect(screen.getByText('Save Location')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toHaveAttribute('type', 'submit');
  });

  it('should populate form with initial values', () => {
    const initialValues = {
      name: 'Test Location',
      address: 'Test Address',
      phone: '1234567890'
    };

    render(<AddEditFrom initialValues={initialValues} />);
    
    // Form should be populated with initial values
    expect(screen.getByDisplayValue('Test Location')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Address')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1234567890')).toBeInTheDocument();
  });

  it('should call onSubmit when form is submitted', () => {
    const mockSubmit = vi.fn();
    render(<AddEditFrom onSubmit={mockSubmit} />);
    
    const submitButton = screen.getByText('Save Location');
    fireEvent.click(submitButton);
    
    expect(mockSubmit).toHaveBeenCalled();
  });
});
