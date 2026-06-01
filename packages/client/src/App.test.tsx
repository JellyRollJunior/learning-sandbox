import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { App } from '@/App.tsx';

describe('App component', () => {
  it('Renders App', () => {
    const { container } = render(<App />);

    expect(container).toMatchSnapshot();
  });
});
