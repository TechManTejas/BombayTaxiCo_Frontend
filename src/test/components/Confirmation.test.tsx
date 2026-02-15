import { describe, it, expect, vi } from 'vitest';
import { confirmation } from '../../components/Confirmation';

// Mock antd Modal
vi.mock('antd', () => ({
  Modal: {
    confirm: vi.fn(({ onOk }) => {
      // Simulate immediate confirmation
      setTimeout(() => onOk && onOk(), 0);
      return {
        destroy: vi.fn(),
        update: vi.fn(),
      };
    }),
  },
}));

describe('Confirmation', () => {
  it('should resolve to true when confirmed', async () => {
    const result = await confirmation('Are you sure?');
    expect(result).toBe(true);
  });

  it('should call Modal.confirm with correct options', async () => {
    const { Modal } = await import('antd');
    
    await confirmation('Test message');
    
    expect(Modal.confirm).toHaveBeenCalledWith({
      title: 'Confirmation',
      content: 'Test message',
      onOk: expect.any(Function),
      onCancel: expect.any(Function),
      okButtonProps: {
        className: 'bg-[#FDB813] text-white',
      },
      cancelButtonProps: {
        className: 'bg-[#FDB813] text-white',
      },
      okText: 'Yes',
      cancelText: 'Cancel',
    });
  });
});
