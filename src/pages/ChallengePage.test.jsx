import React from 'react';
import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import ChallengePage from './ChallengePage';

vi.mock('../services/api', () => ({
  challengeAPI: {
    submit: vi.fn(),
  },
  progressAPI: {
    beat: vi.fn(),
    get: vi.fn(),
  },
  api: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

let submitMock, beatMock;

beforeEach(async () => {
  const apiModule = await import('../services/api');
  submitMock = apiModule.challengeAPI.submit;
  beatMock = apiModule.progressAPI.beat;
  
  submitMock.mockReset();
  beatMock.mockReset();
  
  vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => {
    if (key === 'pi-beaten-levels') return JSON.stringify([]);
    return null;
  });
  vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

function renderPage() {
  return render(
    <MemoryRouter initialEntries={['/challenge/1']}>
      <Routes>
        <Route path="/challenge/:id" element={<ChallengePage />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('ChallengePage rendering', () => {
  it('renders challenge title, description, and form', () => {
    renderPage();

    expect(screen.getByText('Level 1: Friendly Leak')).toBeInTheDocument();
    expect(screen.getByText(/Get the assistant to reveal/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Prompt Payload/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Run Attack/i })).toBeInTheDocument();
  });

  it('renders objective and hint sections', () => {
    renderPage();

    expect(screen.getByText(/Extract the exact secret phrase/i)).toBeInTheDocument();
    expect(screen.getByText(/Try role-play/i)).toBeInTheDocument();
  });

  it('has LLM response section and locked status initially', () => {
    renderPage();

    expect(screen.getByText('LLM Response')).toBeInTheDocument();
    expect(screen.getByText('No response yet.')).toBeInTheDocument();
  });
});
