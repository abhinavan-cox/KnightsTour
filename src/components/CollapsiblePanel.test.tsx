import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CollapsiblePanel } from './CollapsiblePanel';

describe('CollapsiblePanel', () => {
    it('renders the title', () => {
        render(
            <CollapsiblePanel title="Test Panel">
                <div>Content</div>
            </CollapsiblePanel>
        );
        expect(screen.getByText('Test Panel')).toBeInTheDocument();
    });

    it('toggles content visibility', () => {
        render(
            <CollapsiblePanel title="Test Panel">
                <div>Hidden Content</div>
            </CollapsiblePanel>
        );

        // Content should be hidden initially (defaultOpen=false)
        expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();

        // Click to expand
        fireEvent.click(screen.getByText('Test Panel'));
        expect(screen.getByText('Hidden Content')).toBeInTheDocument();

        // Click to collapse
        fireEvent.click(screen.getByText('Test Panel'));
        expect(screen.queryByText('Hidden Content')).not.toBeInTheDocument();
    });

    it('respects defaultOpen prop', () => {
        render(
            <CollapsiblePanel title="Test Panel" defaultOpen={true}>
                <div>Visible Content</div>
            </CollapsiblePanel>
        );
        expect(screen.getByText('Visible Content')).toBeInTheDocument();
    });
});
