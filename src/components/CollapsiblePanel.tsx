import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

interface CollapsiblePanelProps {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
    subtitle?: React.ReactNode;
}

export const CollapsiblePanel = ({ title, children, defaultOpen = false, subtitle }: CollapsiblePanelProps) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border border-husain-bg/20 rounded-lg overflow-hidden bg-husain-card shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-3 bg-husain-bg/50 hover:bg-husain-bg/80 transition-colors text-left"
            >
                <div className="flex items-center gap-2">
                    <span className="font-semibold text-husain-canvas">{title}</span>
                    {subtitle && (
                        <span className="text-sm font-normal opacity-80">{subtitle}</span>
                    )}
                </div>
                {isOpen ? (
                    <ChevronDown className="w-5 h-5 text-husain-canvas/70" />
                ) : (
                    <ChevronRight className="w-5 h-5 text-husain-canvas/70" />
                )}
            </button>

            {isOpen && (
                <div className="p-4 border-t border-husain-bg/20">
                    {children}
                </div>
            )}
        </div>
    );
};
