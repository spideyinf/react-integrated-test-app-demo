import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

jest.mock('@firebase/firestore', () => ({
  getDocs() {
    return Promise.resolve([
      {
        id: 1,
        data: () => ({
          title: 'Demo',
          url: 'https://www.youtube.com/embed/id',
          description: 'Description',
          sharedBy: 'test@gmail.com'
        })
      }
    ]);
  },
  collection: jest.fn(),
  getFirestore: jest.fn(),
  setDoc() {
    return Promise.resolve({
      status: '200'
    });
  }
}));

afterEach(() => {
  cleanup();
  jest.resetAllMocks();
});

test('Render React Movies App', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  await waitFor(() => {
    const title = screen.getByText(/Funny Movies/i);
    expect(title).toBeInTheDocument();
  });
});
