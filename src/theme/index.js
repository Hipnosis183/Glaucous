// Theme dark/light values.
export const themes = [
    { i: 0, name: 'Default', codes: ['#FFFFFF', '#F4F4F5', '#E4E4E7', '#D4D4D8', '#A1A1AA', '#71717A', '#52525B', '#3F3F46', '#27272A', '#18181B'] },
]

// Set a theme given an array of dark/light colors.
export async function selectTheme(codes) {
    for (let [i, code] of codes.entries()) {
        document.documentElement.style.setProperty('--color-theme-' + (i == 0 ? '0' : i + '00'), code)
    }
}

// Theme color values.
export const colors = [
    { i: 0, name: 'Cool Gray', codes: ['#F3F4F6', '#E5E7EB', '#D1D5DB', '#9CA3AF', '#6B7280', '#4B5563', '#374151', '#1F2937', '#111827'] },
    { i: 1, name: 'Red', codes: ['#FEE2E2', '#FECACA', '#FCA5A5', '#F87171', '#EF4444', '#DC2626', '#B91C1C', '#991B1B', '#7F1D1D'] },
    { i: 2, name: 'Orange', codes: ['#FFEDD5', '#FED7AA', '#FDBA74', '#FB923C', '#F97316', '#EA580C', '#C2410C', '#9A3412', '#7C2D12'] },
    { i: 3, name: 'Amber', codes: ['#FEF3C7', '#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309', '#92400E', '#78350F'] },
    { i: 4, name: 'Yellow', codes: ['#FEF9C3', '#FEF08A', '#FDE047', '#FACC15', '#EAB308', '#CA8A04', '#A16207', '#854D0E', '#713F12'] },
    { i: 5, name: 'Lime', codes: ['#ECFCCB', '#D9F99D', '#BEF264', '#A3E635', '#84CC16', '#65A30D', '#4D7C0F', '#3F6212', '#365314'] },
    { i: 6, name: 'Green', codes: ['#DCFCE7', '#BBF7D0', '#86EFAC', '#4ADE80', '#22C55E', '#16A34A', '#15803D', '#166534', '#14532D'] },
    { i: 7, name: 'Emerald', codes: ['#D1FAE5', '#A7F3D0', '#6EE7B7', '#34D399', '#10B981', '#059669', '#047857', '#065F46', '#064E3B'] },
    { i: 8, name: 'Teal', codes: ['#CCFBF1', '#99F6E4', '#5EEAD4', '#2DD4BF', '#14B8A6', '#0D9488', '#0F766E', '#115E59', '#134E4A'] },
    { i: 9, name: 'Sky', codes: ['#E0F2FE', '#BAE6FD', '#7DD3FC', '#38BDF8', '#0EA5E9', '#0284C7', '#0369A1', '#075985', '#0C4A6E'] },
    { i: 10, name: 'Blue', codes: ['#DBEAFE', '#BFDBFE', '#93C5FD', '#60A5FA', '#3B82F6', '#2563EB', '#1D4ED8', '#1E40AF', '#1E3A8A'] },
    { i: 11, name: 'Indigo', codes: ['#E0E7FF', '#C7D2FE', '#A5B4FC', '#818CF8', '#6366F1', '#4F46E5', '#4338CA', '#3730A3', '#312E81'] },
    { i: 12, name: 'Violet', codes: ['#EDE9FE', '#DDD6FE', '#C4B5FD', '#A78BFA', '#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95'] },
    { i: 13, name: 'Purple', codes: ['#F3E8FF', '#E9D5FF', '#D8B4FE', '#C084FC', '#A855F7', '#9333EA', '#7E22CE', '#6B21A8', '#581C87'] },
    { i: 14, name: 'Fuchsia', codes: ['#FAE8FF', '#F5D0FE', '#F0ABFC', '#E879F9', '#D946EF', '#C026D3', '#A21CAF', '#86198F', '#701A75'] },
    { i: 15, name: 'Pink', codes: ['#FCE7F3', '#FBCFE8', '#F9A8D4', '#F472B6', '#EC4899', '#DB2777', '#BE185D', '#9D174D', '#831843'] },
    { i: 16, name: 'Rose', codes: ['#FFE4E6', '#FECDD3', '#FDA4AF', '#FB7185', '#F43F5E', '#E11D48', '#BE123C', '#9F1239', '#881337'] },
    { i: 17, name: 'Clear', codes: ['#FFFFFF', '#FFFFFF', '#FFFFFF', '#AFD1D1', '#AFD1D1', '#AFD1D1', '#96C3C3', '#96C3C3', '#96C3C3'] }
]

// Set a color theme given an array of colors.
export async function selectColor(codes) {
    for (let [i, code] of codes.entries()) {
        document.documentElement.style.setProperty('--color-color-' + (i + 1) + '00', code)
    }
}